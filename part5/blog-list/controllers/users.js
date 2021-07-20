const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { name, username, password } = req.body;

    if (!name || !password || password.length < 3) {
      return res.status(400).send({ error: "Username or password not valid" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    const result = await newUser.save();
    res.status(201).json(result);
  })
);

router.get("/", async (req, res, next) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

module.exports = router;
