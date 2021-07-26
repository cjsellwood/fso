import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, deleteBlog } from "../store/blogsReducer";

const SingleBlog = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <span>{blog.likes} likes </span>
      <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username ? (
        <button onClick={() => dispatch(deleteBlog(blog.id))}>delete</button>
      ) : null}
    </div>
  );
};

export default SingleBlog;
