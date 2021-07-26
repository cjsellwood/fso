import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../store/blogsReducer";

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
      <h2>Create New</h2>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newBlog.title}
          onChange={(e) => newBlogInput(e)}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={newBlog.author}
          onChange={(e) => newBlogInput(e)}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={newBlog.url}
          onChange={(e) => newBlogInput(e)}
        />
      </div>
      <button id="submit-blog-button" type="submit">
        Create
      </button>
    </form>
  );
};

export default NewBlogForm;
