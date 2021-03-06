import React from "react";

const Message = ({ error, success }) => {
  if (success) {
    return (
      <div
        style={{
          backgroundColor: "rgb(191, 245, 201)",
          padding: "12px",
        }}
      >
        <h3>{success}</h3>
      </div>
    );
  } else if (error) {
    return (
      <div
        className="error"
        style={{
          backgroundColor: "rgb(245, 186, 188)",
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
