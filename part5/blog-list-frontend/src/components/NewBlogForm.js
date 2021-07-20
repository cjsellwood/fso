import React from "react";

const NewBlogForm = ({ newBlog, newBlogInput, submitBlog }) => {
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
      <button type="submit">Create</button>
    </form>
  );
};

export default NewBlogForm;
