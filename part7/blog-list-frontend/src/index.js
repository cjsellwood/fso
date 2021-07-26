import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import notificationReducer from "./store/notificationReducer";
import blogsReducer from "./store/blogsReducer";
import userReducer from "./store/userReducer";
import usersReducer from "./store/usersReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
