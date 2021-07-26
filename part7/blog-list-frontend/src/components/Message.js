import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Message = () => {
  const error = useSelector((state) => state.notification.error);
  const success = useSelector((state) => state.notification.success);
  if (success) {
    return (
      <Alert
        color="success"
        style={{
          backgroundColor: "rgb(191, 245, 201)",
          padding: "12px",
        }}
      >
        {success}
      </Alert>
    );
  } else if (error) {
    return (
      <Alert
        color="error"
        className="error"
        style={{
          backgroundColor: "rgb(245, 186, 188)",
          padding: "12px",
        }}
      >
        {error}
      </Alert>
    );
  } else {
    return null;
  }
};

export default Message;
