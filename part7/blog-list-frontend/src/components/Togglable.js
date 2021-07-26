import React, { useState } from "react";
import { Button } from "@material-ui/core";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {visible ? (
        <div>
          {props.children}
          <Button color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button color="secondary" onClick={() => setVisible(true)}>
          {props.buttonLabel}
        </Button>
      )}
    </div>
  );
};

export default Togglable;
