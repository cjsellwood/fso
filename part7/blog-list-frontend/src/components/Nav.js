import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = ({ logoutUser }) => {
  const user = useSelector((state) => state.user);
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to={"/"}>blogs</Link>
        </li>
        <li>
          <Link to={"/users"}>users</Link>
        </li>
        {user === null ? null : (
          <React.Fragment>
            <li>
              <p>{user.name} logged in</p>
            </li>
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
