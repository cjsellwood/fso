import React from "react";

const SuccessMessage = ({ message }) => {
  if (message) {
    return <h2 className="success">{message}</h2>;
  } else {
    return null;
  }
};

export default SuccessMessage;
