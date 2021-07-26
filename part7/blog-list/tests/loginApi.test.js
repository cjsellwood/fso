const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  let firstUser;
  const initialUsers = await helper.initialUsers();
  for (let user of initialUsers) {
    let userObject = new User(user);
    firstUser = userObject;
    await userObject.save();
  }

  let blogIds = [];
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: firstUser._id });
    blogIds.push(blogObject._id);
    await blogObject.save();
  }

  await User.findByIdAndUpdate(firstUser._id, { blogs: blogIds });
});

describe("login route", () => {
  it("should send a token to the user for authentication if info correct", async () => {
    const user = { username: "test 1", password: "test 1" };
    const result = await api
      .post("/api/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.token).not.toBeUndefined();
    expect(result.body.username).not.toBeUndefined();
    expect(result.body.name).not.toBeUndefined();
  });

  it("should send error if password incorrect", async () => {
    const user = { username: "test 1", password: "test" };
    const result = await api
      .post("/api/login")
      .send(user)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toBe("Invalid username or password");
  });

  it("should send error if username not found", async () => {
    const user = { username: "test", password: "test 1" };
    const result = await api
      .post("/api/login")
      .send(user)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toBe("Invalid username or password");
  });
});
