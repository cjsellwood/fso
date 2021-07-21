import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogDisplay from "./components/BlogDisplay";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setSuccess(`Logged In`);
      setTimeout(() => {
        setSuccess(null);
      }, 4000);
    } catch (error) {
      setError(`Wrong username or password`);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("blog-list-user");
    setUser(null);
    setSuccess(`Logged Out`);
    setTimeout(() => {
      setSuccess(null);
    }, 4000);
  };

  const createBlog = async (newBlog) => {
    try {
      const result = await blogService.create(newBlog);
      setBlogs([...blogs, result]);

      setSuccess(`Blog added: ${result.title}`);
      setTimeout(() => {
        setSuccess(null);
      }, 4000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 4000);
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
      setBlogs(likedBlogs)

      setSuccess(`Blog liked: ${result.title}`);
      setTimeout(() => {
        setSuccess(null);
      }, 4000);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Message error={error} success={success} />
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
          <BlogDisplay blogs={blogs} likeBlog={likeBlog} />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
