const totalLikes = require("../utils/list_helper").totalLikes;

describe("totalLikes function", () => {
  const listWithOneBlog = [
    {
      _id: "1",
      title: "Blog",
      author: "Blog writer",
      url: "www.blog.com",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithTwoBlogs = [
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

  it("should have 5 likes when used with one blog", () => {
    expect(totalLikes(listWithOneBlog)).toBe(5);
  });

  it("should have 14 likes when used with two blogs", () => {
    expect(totalLikes(listWithTwoBlogs)).toBe(14);
  });
});
