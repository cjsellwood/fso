import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogDisplay from "./components/BlogDisplay";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

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

    const user = await loginService.login(username, password);

    localStorage.setItem("blog-list-user", JSON.stringify(user));

    blogService.setToken(user.token);

    setUser(user);
    setUsername("");
    setPassword("");
  };

  const logoutUser = () => {
    localStorage.removeItem("blog-list-user");
    setUser(null);
  };

  const newBlogInput = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const submitBlog = async (e) => {
    e.preventDefault();

    const result = await blogService.create(newBlog);
    setBlogs([...blogs, result]);

    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          loginUser={loginUser}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <BlogDisplay
          name={user.name}
          blogs={blogs}
          logoutUser={logoutUser}
          newBlog={newBlog}
          newBlogInput={newBlogInput}
          submitBlog={submitBlog}
        />
      )}
    </div>
  );
};

export default App;
