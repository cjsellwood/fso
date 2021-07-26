import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import blogService from "./services/blogs";
import BlogDisplay from "./components/BlogDisplay";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import NewBlogForm from "./components/NewBlogForm";
import { setSuccess } from "./store/notificationReducer";
import { initializeBlogs } from "./store/blogsReducer";
import { setUser } from "./store/userReducer";
import { Switch, Route } from "react-router-dom";
import Users from "./components/Users";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("blog-list-user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
      blogService.setToken(JSON.parse(storedUser).token);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("blog-list-user");
    dispatch(setUser(null));
    dispatch(setSuccess("Logged Out"));
  };

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? (
        <LoginForm />
      ) : (
        <React.Fragment>
          <p>{user.name} logged in</p>
          <button onClick={logoutUser}>Logout</button>
        </React.Fragment>
      )}
      <Switch>
        <Route path="/" exact>
          {user === null ? null : (
            <React.Fragment>
              <Togglable buttonLabel="create new blog">
                <NewBlogForm />
              </Togglable>
              <BlogDisplay />
            </React.Fragment>
          )}
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
      <Message />
    </div>
  );
};

export default App;
