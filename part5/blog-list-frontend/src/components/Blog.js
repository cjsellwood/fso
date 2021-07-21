import React, { useState } from "react";

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [details, setDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(!details)}>
          {!details ? "view" : "hide"}
        </button>
      </div>
      {!details ? null : (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => likeBlog(blog.id)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
