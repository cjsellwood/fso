const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const tokenInput = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(tokenInput, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
