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

module.exports = router;
