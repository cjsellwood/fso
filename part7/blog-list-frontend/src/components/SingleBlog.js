import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, deleteBlog, addComment } from "../store/blogsReducer";

const SingleBlog = () => {
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (!blog) {
    return null;
  }

  const submitComment = (e) => {
    e.preventDefault();

    dispatch(addComment(blog.id, newComment));
    setNewComment("");
  };

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
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={`${blog.id}-comment-${index}`}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleBlog;
