import { Typography, Link as MUILink } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) {
    return null;
  }

  return (
    <div>
      <Typography variant="h3">{user.name}</Typography>
      <Typography variant="h5">added blogs</Typography>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <MUILink component={Link} to={`/blogs/${blog.id}`}>
              {blog.title}
            </MUILink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
