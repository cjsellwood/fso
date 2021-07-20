import React from "react";

const Message = ({ error, success }) => {
  if (success) {
    return (
      <div
        style={{
          backgroundColor: "#bff5c9",
          padding: "12px",
        }}
      >
        <h3>{success}</h3>
      </div>
    );
  } else if (error) {
    return (
      <div
        style={{
          backgroundColor: "#f5babc",
          padding: "12px",
        }}
      >
        <h3>{error}</h3>
      </div>
    );
  } else {
    return null;
  }
};

export default Message;
