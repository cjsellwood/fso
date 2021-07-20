import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";

const BlogDisplay = ({
  blogs,
  name,
  logoutUser,
  newBlog,
  submitBlog,
  newBlogInput,
}) => {
  return (
    <div>
      <p>{name} logged in</p>
      <button onClick={logoutUser}>Logout</button>
      <NewBlogForm
        newBlog={newBlog}
        submitBlog={submitBlog}
        newBlogInput={newBlogInput}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogDisplay;
