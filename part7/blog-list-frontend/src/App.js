import React, { useEffect } from "react";
import "./App.css";
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
import User from "./components/User";
import SingleBlog from "./components/SingleBlog";
import Nav from "./components/Nav";

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
      <Nav logoutUser={logoutUser} />
      <Message />
      <h1>Blogs</h1>
      {user === null ? <LoginForm /> : null}
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
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
