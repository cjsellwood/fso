import Blog from "./Blog";

const BlogDisplay = ({ blogs, likeBlog, deleteBlog }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default BlogDisplay;
