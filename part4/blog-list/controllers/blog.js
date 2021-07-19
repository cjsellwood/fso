const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

// Create new blog listing
router.post("/", async (req, res) => {
  const author = await User.find({});
  const blog = new Blog({ ...req.body, user: author[0]._id });
  if (!blog.title && !blog.url) {
    return res.status(400).end();
  }

  author[0].blogs = [...author[0].blogs, blog._id]
  await author[0].save();

  const result = await blog.save();
  res.status(201).json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
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
