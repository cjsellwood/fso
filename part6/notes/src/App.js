import React from "react";
import Notes from "./components/Notes";
import NewNote from "./components/newNote";
import VisibilityFilter from "./components/VisibilityFilter";

const App = () => {
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
