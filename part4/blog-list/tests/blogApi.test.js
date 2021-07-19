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

describe("Get blogs path", () => {
  it("should return notes in JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return 2 blogs", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body.length).toBe(helper.initialBlogs.length);
  });

  it("should have a property called id", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body[0].id).not.toBeUndefined();
    expect(res.body[0]._id).toBeUndefined();
  });

  it("should display the user who added the blog", async () => {
    const res = await api.get("/api/blogs");
    expect(res.body[0].user).not.toBeUndefined();
    expect(res.body[0].user.username).toBe("test 1");
  });
});

describe("Adding new blog path", () => {
  it("should have a length of 3 after adding new blog", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Writer 3",
      url: "www.blog3.com",
      likes: 73,
    };

    const userInfo = await api
      .post("/api/login")
      .send({ username: "test 1", password: "test 1" });

    const token = userInfo.body.token;
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${token}`)
      .expect(201);

    const res = await api.get("/api/blogs");
    expect(res.body.length).toBe(3);
  });

  it("should contain a blog with title Blog 3", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Writer 3",
      url: "www.blog3.com",
      likes: 73,
    };

    const userInfo = await api
      .post("/api/login")
      .send({ username: "test 1", password: "test 1" });

    const token = userInfo.body.token;
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${token}`)
      .expect(201);

    const res = await api.get("/api/blogs");
    const blogTitles = res.body.map((blog) => blog.title);
    expect(blogTitles).toContain("Blog 3");
  });

  it("should set likes to 0 if missing from request", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Writer 3",
      url: "www.blog3.com",
    };

    const userInfo = await api
      .post("/api/login")
      .send({ username: "test 1", password: "test 1" });

    const token = userInfo.body.token;
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${token}`)
      .expect(201);

    const res = await api.get("/api/blogs");
    expect(res.body[2].likes).toBe(0);
  });

  it("should respond with status code 400 if title and url are missing", async () => {
    const newBlog = {
      author: "Writer 3",
      likes: 73,
    };

    const userInfo = await api
      .post("/api/login")
      .send({ username: "test 1", password: "test 1" });

    const token = userInfo.body.token;
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${token}`)
      .expect(400);
  });

  it("should add a user as the creator", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Writer 3",
      url: "www.blog3.com",
      likes: 73,
    };

    const userInfo = await api
      .post("/api/login")
      .send({ username: "test 1", password: "test 1" });

    const token = userInfo.body.token;
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${token}`)
      .expect(201);

    const res = await api.get("/api/blogs");
    expect(res.body[res.body.length - 1].user).not.toBeUndefined();
  });

  it("should add the blog to the users blogs", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Writer 3",
      url: "www.blog3.com",
      likes: 73,
    };

    const userInfo = await api
      .post("/api/login")
      .send({ username: "test 1", password: "test 1" });

    const token = userInfo.body.token;
    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", `bearer ${token}`);

    const user = await User.findById(res.body.user);
    expect(user.blogs.length).toBe(helper.initialBlogs.length + 1);
  });

  it("should only be added if the user sent a valid token", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Writer 3",
      url: "www.blog3.com",
      likes: 73,
    };

    const userInfo = await api
      .post("/api/login")
      .send({ username: "test 1", password: "test 1" });

    const token = userInfo.body.token;

    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .set("authorization", `bearer ${token}`);

    const user = await User.findById(res.body.user);
    expect(user.blogs.length).toBe(helper.initialBlogs.length + 1);
  });

  it("should not be added if user does not send a valid token", async () => {
    const newBlog = {
      title: "Blog 3",
      author: "Writer 3",
      url: "www.blog3.com",
      likes: 73,
    };

    const res = await api.post("/api/blogs").send(newBlog).expect(401);

    expect(res.body.error).toBe("token missing or invalid");
  });
});

describe("deleting a specific blog path", () => {
  it("should return status 204", async () => {
    const before = await api.get("/api/blogs");

    await api.delete(`/api/blogs/${before.body[0].id}`).expect(204);
  });

  it("should delete blog from database", async () => {
    const before = await api.get("/api/blogs");

    await api.delete(`/api/blogs/${before.body[0].id}`);

    const after = await api.get("/api/blogs");

    expect(after.body.length).toBe(1);
  });
});

describe("updating a blog path", () => {
  it("should return JSON format", async () => {
    const before = await api.get("/api/blogs");

    const updatedBlog = {
      title: "Blog 1",
      author: "Writer 1",
      url: "www.blog1.com",
      likes: 99,
    };

    await api
      .put(`/api/blogs/${before.body[0].id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should change the likes of the blog", async () => {
    const before = await api.get("/api/blogs");

    const updatedBlog = {
      title: "Blog 1",
      author: "Writer 1",
      url: "www.blog1.com",
      likes: 99,
    };

    const result = await api
      .put(`/api/blogs/${before.body[0].id}`)
      .send(updatedBlog);

    expect(result.body.likes).toBe(99);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
