require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const middleware = require("./utils/middleware");

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);

app.use(middleware.errorHandler);

module.exports = app;
