import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogDisplay from "./components/BlogDisplay";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import { setError, setSuccess } from "./store/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("blog-list-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      blogService.setToken(JSON.parse(storedUser).token);
    }
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login(username, password);

      localStorage.setItem("blog-list-user", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(setSuccess("Logged In"));
    } catch (error) {
      dispatch(setError("Wrong username or password"));
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("blog-list-user");
    setUser(null);
    dispatch(setSuccess("Logged Out"));
  };

  const createBlog = async (newBlog) => {
    try {
      const result = await blogService.create(newBlog);
      setBlogs([
        ...blogs,
        {
          ...result,
          user: {
            id: result.user,
            username: user.username,
          },
        },
      ]);

      dispatch(setSuccess(`Blog added: ${result.title}`));
    } catch (error) {
      dispatch(setError(error.response.data.error));
    }
  };

  const likeBlog = async (id) => {
    let blogsCopy = [...blogs];
    const updatedBlog = { ...blogsCopy.find((blog) => blog.id === id) };

    updatedBlog.likes = updatedBlog.likes + 1;
    updatedBlog.user = updatedBlog.user.id;

    try {
      const result = await blogService.update(updatedBlog);

      const likedBlogs = blogsCopy.map((blog) => {
        if (blog.id === result.id) {
          return {
            ...blog,
            likes: result.likes,
          };
        } else {
          return {
            ...blog,
          };
        }
      });
      setBlogs(likedBlogs);

      dispatch(setSuccess(`Blog liked: ${result.title}`));
    } catch (error) {
      dispatch(setError(error.response.data.error));
    }
  };

  const deleteBlog = async (id) => {
    let blogsCopy = [...blogs];
    if (!window.confirm("Are you sure you want to delete blog")) {
      return;
    }

    try {
      await blogService.deleteBlog(id);
      setBlogs(blogsCopy.filter((blog) => blog.id !== id));
    } catch (error) {
      dispatch(setError(error.response.data.error));
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Message />
      {user === null ? (
        <LoginForm
          loginUser={loginUser}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <React.Fragment>
          <p>{user.name} logged in</p>
          <button onClick={logoutUser}>Logout</button>
          <Togglable buttonLabel="create new blog">
            <NewBlogForm createBlog={createBlog} />
          </Togglable>
          <BlogDisplay
            blogs={blogs}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
