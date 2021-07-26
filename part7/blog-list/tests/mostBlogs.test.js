const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("mostBlogs function", () => {
  const blogs = [
    {
      _id: "1",
      title: "Blog",
      author: "Blog writer",
      url: "www.blog.com",
      likes: 5,
      __v: 0,
    },
    {
      _id: "2",
      title: "Blog 2",
      author: "Blog writer 2",
      url: "www.blog2.com",
      likes: 9,
      __v: 0,
    },
    {
      _id: "3",
      title: "Blog 3",
      author: "Blog writer 2",
      url: "www.blog3.com",
      likes: 22,
      __v: 0,
    },
  ];

  it("should return Blog writer 2 as author with most blogs and 2 blogs", () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "Blog writer 2",
      blogs: 2,
    });
  });
});
