import React from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogDisplay = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div className="blog-list">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default BlogDisplay;
