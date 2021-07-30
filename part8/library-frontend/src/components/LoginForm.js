import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); //eslint-disable-line

  if (!props.show) {
    return null;
  }

  const submitLogin = async (e) => {
    e.preventDefault();

    login({ variables: { username, password } });

    props.setPage("books");
  };

  return (
    <div>
      <form>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={submitLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
