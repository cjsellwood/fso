const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("Get notes path", () => {
  it("should return notes in JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 2 notes", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body.length).toBe(helper.initialBlogs.length);
  });

  it("should have a property called id", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body[0].id).not.toBeUndefined();
    expect(res.body[0]._id).toBeUndefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
