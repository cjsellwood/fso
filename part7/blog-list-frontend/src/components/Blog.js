import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { likeBlog, deleteBlog } from "../store/blogsReducer";

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span> <span>{blog.author}</span>
        <button onClick={() => setDetails(!details)}>
          {!details ? "view" : "hide"}
        </button>
      </div>
      {!details ? null : (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => dispatch(likeBlog(blog))}>like</button>
          </div>
          <div>
            {blog.user.username === user.username ? (
              <button onClick={() => dispatch(deleteBlog(blog.id))}>
                delete
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
