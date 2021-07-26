import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../store/blogsReducer";
import { Typography, TextField, Button } from "@material-ui/core";

const NewBlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const newBlogInput = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const submitBlog = (e) => {
    e.preventDefault();

    dispatch(addBlog(newBlog, user));

    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <form onSubmit={submitBlog}>
      <Typography variant="h4">
        Create New
      </Typography>
      <div>
        <TextField
          label="title"
          id="title"
          name="title"
          value={newBlog.title}
          onChange={(e) => newBlogInput(e)}
          variant="outlined"
          style={{ margin: "12px" }}
        />
      </div>
      <div>
        <TextField
          label="author"
          type="text"
          id="author"
          name="author"
          value={newBlog.author}
          onChange={(e) => newBlogInput(e)}
          variant="outlined"
          style={{ margin: "12px" }}
        />
      </div>
      <div>
        <TextField
          label="url"
          type="text"
          id="url"
          name="url"
          value={newBlog.url}
          onChange={(e) => newBlogInput(e)}
          variant="outlined"
          style={{ margin: "12px" }}
        />
      </div>
      <Button color="secondary" id="submit-blog-button" type="submit">
        Create
      </Button>
    </form>
  );
};

export default NewBlogForm;
