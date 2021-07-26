import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userReducer";
import { setSuccess, setError } from "../store/notificationReducer";
import { Button, TextField, Typography } from "@material-ui/core";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loginUser = (e) => {
    e.preventDefault();
    try {
      dispatch(login(username, password));
      setUsername("");
      setPassword("");
      dispatch(setSuccess("Logged In"));
    } catch (error) {
      dispatch(setError("Wrong username or password"));
    }
  };
  return (
    <form onSubmit={loginUser}>
      <Typography variant="h4">
        Login
      </Typography>
      <div>
        <TextField
          style={{ margin: "8px" }}
          label="username"
          variant="outlined"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{ margin: "8px" }}
          label="password"
          variant="outlined"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" color="secondary">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
