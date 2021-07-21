const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { tokenExtractor, userExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

// Create new blog listing
router.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const token = req.token;
  const userId = req.userId;

  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!userId) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const author = await User.findById(userId);
  const blog = new Blog({ ...req.body, user: author._id });
  if (!blog.title && !blog.url) {
    return res.status(400).json({ error: "Needs to have title and url" });
  }

  author.blogs = [...author.blogs, blog._id];
  await author.save();

  const result = await blog.save();
  res.status(201).json(result);
});

router.delete("/:id", tokenExtractor, userExtractor, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!userId) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(id);

  if (blog.user.toString() !== userId.toString()) {
    return res.status(401).json({ error: "you are not the creator of blog" });
  }

  await Blog.findByIdAndRemove(id);

  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const token = req.token;
  const userId = req.userId;

  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!userId) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  
  const { id } = req.params;
  delete req.body.id;
  delete req.body.__v;

  const updated = await Blog.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
