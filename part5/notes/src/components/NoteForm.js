import React, { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("a new note...");

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  // Submit new note
  const addNote = (e) => {
    e.preventDefault();

    createNote({
      content: newNote,
      important: Math.random() < 0.5,
    });

    setNewNote("");
  };
  return (
    <div className="formDiv">
      <h2>Create a note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};
export default NoteForm;
