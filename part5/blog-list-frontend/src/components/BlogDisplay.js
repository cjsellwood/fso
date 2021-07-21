import React from "react";
import Blog from "./Blog";

const BlogDisplay = ({ blogs, likeBlog, deleteBlog, user }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  );
};

export default BlogDisplay;
