import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, deleteBlog, addComment } from "../store/blogsReducer";
import {
  Container,
  Link as MUILink,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";

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
    if (newComment === "") {
      return;
    }

    dispatch(addComment(blog.id, newComment));
    setNewComment("");
  };

  return (
    <Container>
      <Typography variant="h3">
        {blog.title} {blog.author}
      </Typography>
      <MUILink href={blog.url}>{blog.url}</MUILink>
      <br />
      <span>{blog.likes} likes </span>
      <Button color="secondary" onClick={() => dispatch(likeBlog(blog))}>
        like
      </Button>
      <p>added by {blog.user.name}</p>
      {blog.user.username === user.username ? (
        <Button color="secondary" onClick={() => dispatch(deleteBlog(blog.id))}>
          delete
        </Button>
      ) : null}
      <Typography variant="h6">Comments</Typography>
      <form onSubmit={submitComment}>
        <TextField
          variant="outlined"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <br />
        <Button color="secondary" type="submit">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={`${blog.id}-comment-${index}`}>{comment}</li>
        ))}
      </ul>
    </Container>
  );
};

export default SingleBlog;
