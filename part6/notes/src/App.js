import React from "react";
import Notes from "./components/Notes";
import NewNote from "./components/newNote";

const App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
