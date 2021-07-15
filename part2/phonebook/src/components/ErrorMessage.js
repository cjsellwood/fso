import React from "react";

const ErrorMessage = ({ message }) => {
  if (message) {
    return <h2 className="error">{message}</h2>;
  } else {
    return null;
  }
};

export default ErrorMessage;
