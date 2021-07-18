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

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  for (let user of helper.initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
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
  });
});
