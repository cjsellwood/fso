import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userReducer";
import { setSuccess, setError } from "../store/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(username, password));
      setUsername("");
      setPassword("");
      dispatch(setSuccess("Logged In"));
    } catch (error) {
      dispatch(setError("Wrong username or password"));
    }
  };
  return (
    <form onSubmit={loginUser}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
