const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    title: "Blog 1",
    author: "Writer 1",
    url: "www.blog1.com",
    likes: 12,
  },
  {
    title: "Blog 2",
    author: "Writer 2",
    url: "www.blog2.com",
    likes: 52,
  },
];

const initialUsers = async () => [
  {
    name: "test 1",
    username: "test 1",
    password: await bcrypt.hash("test 1", 10),
  },
];

module.exports = {
  initialBlogs,
  initialUsers,
};
