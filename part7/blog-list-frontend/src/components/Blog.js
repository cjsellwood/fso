import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardContent, Link as MUILink } from "@material-ui/core";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <Card style={blogStyle}>
      <CardContent>
        <div>
          <MUILink component={Link} to={`/blogs/${blog.id}`}>
            <span>{blog.title}</span> <span>{blog.author}</span>
          </MUILink>
        </div>
      </CardContent>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
