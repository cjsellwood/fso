const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = new Blog(req.body);

  if (!blog.title && !blog.url) {
    return res.status(400).end();
  }

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
