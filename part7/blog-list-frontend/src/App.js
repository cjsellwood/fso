import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogDisplay from "./components/BlogDisplay";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import { setError, setSuccess } from "./store/notificationReducer";
import { initializeBlogs, addBlog } from "./store/blogsReducer";

const App = () => {
  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
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

  const createBlog = (newBlog) => {
    dispatch(addBlog(newBlog, user));
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
            user={user}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
