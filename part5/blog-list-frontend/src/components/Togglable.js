import React, { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {visible ? (
        <div>
          {props.children}
          <button onClick={() => setVisible(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
      )}
    </div>
  );
};

export default Togglable;
