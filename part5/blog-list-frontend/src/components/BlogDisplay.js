import Blog from "./Blog";

const BlogDisplay = ({ blogs, name, logoutUser }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in</p>
      <button onClick={logoutUser}>Logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogDisplay;
