import Blog from "./Blog";

const BlogDisplay = ({ blogs, likeBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      ))}
    </div>
  );
};

export default BlogDisplay;
