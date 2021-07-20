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

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();

    const user = await loginService.login(username, password);

    setUser(user);
    setUsername("");
    setPassword("");
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
        <BlogDisplay name={user.name} blogs={blogs} />
      )}
    </div>
  );
};

export default App;
