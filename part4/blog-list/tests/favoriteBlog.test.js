const favoriteBlog = require("../utils/list_helper").favoriteBlog;

describe("favoriteBlog function", () => {
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
  ];
  
  it("should return the details of the second blog", () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: "Blog 2",
      author: "Blog writer 2",
      likes: 9,
    });
  });
});
