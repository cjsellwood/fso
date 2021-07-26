import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar } from "@material-ui/core";

const Nav = ({ logoutUser }) => {
  const user = useSelector((state) => state.user);
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button color="inherit">
          <Link to={"/"}>blogs</Link>
        </Button>
        <Button color="inherit">
          <Link to={"/users"}>users</Link>
        </Button>
        <div style={{ flexGrow: 1 }}></div>
        {user === null ? null : (
          <React.Fragment>
            <p>{user.name} logged in</p>
            <Button color="inherit" onClick={logoutUser}>
              Logout
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
