const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

// Create new blog listing
router.post("/", async (req, res) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const author = await User.find({});
  const blog = new Blog({ ...req.body, user: author[0]._id });
  if (!blog.title && !blog.url) {
    return res.status(400).end();
  }

  author[0].blogs = [...author[0].blogs, blog._id];
  await author[0].save();

  const result = await blog.save();
  res.status(201).json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(id);

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return res.status(401).json({ error: "you are not the creator of blog" });
  }

  await Blog.findByIdAndRemove(id);

  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const updated = await Blog.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
