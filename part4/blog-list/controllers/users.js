const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/", async (req, res, next) => {
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    username,
    password: hashedPassword,
  });

  const result = await newUser.save();
  res.status(201).json(result);
});

router.get("/", async (req, res, next) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = router;
