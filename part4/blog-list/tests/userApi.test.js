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
  for (let user of helper.initialUsers) {
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

describe("users api", () => {
  describe("creating a new user", () => {
    test("it should add new user to database", async () => {
      const newUser = {
        username: "test 2",
        name: "test 2",
        password: "test 2",
      };
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const users = await User.find({});
      const usernames = users.map((user) => user.username);
      expect(usernames).toContain("test 2");
    });

    test("it should not add user if username or password are not given", async () => {
      const newUser = {
        name: "test2",
      };
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toBe("Username or password not valid");
      const users = await User.find({});
      expect(users.length).toBe(1);
    });

    test("it should not add user if password is less than 3 characters", async () => {
      const newUser = {
        username: "test 2",
        name: "test 2",
        password: "te",
      };
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toBe("Username or password not valid");
      const users = await User.find({});
      expect(users.length).toBe(1);
    });

    test("it should not add user if username is less than 3 characters", async () => {
      const newUser = {
        username: "te",
        name: "test 2",
        password: "test 2",
      };
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "shorter than the minimum allowed length"
      );
      const users = await User.find({});
      expect(users.length).toBe(1);
    });

    test("it should not add user if username is not unique", async () => {
      const newUser = {
        username: "test 1",
        name: "test 1",
        password: "test 1",
      };
      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("expected `username` to be unique");
      const users = await User.find({});
      expect(users.length).toBe(1);
    });
  });

  describe("fetching all users", () => {
    test("should return a list of all users", async () => {
      const result = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(result.body.length).toBe(1);
      expect(result.body[0].username).toBe("test 1");
      expect(result.body[0].id).not.toBeUndefined();
      expect(result.body[0].password).toBeUndefined();
    });

    test("should display the blogs the user has added", async () => {
      const result = await api.get("/api/users");

      expect(result.body[0].blogs.length).toBe(2);
      expect(result.body[0].blogs[0].title).toBe("Blog 1");
    });
  });
});
