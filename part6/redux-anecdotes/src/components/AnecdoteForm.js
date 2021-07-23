import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.note.value;
    axios
      .post("http://localhost:3001/anecdotes", { content: anecdote, votes: 0 })
      .then((response) => {
        dispatch(addAnecdote(response.data));
        dispatch(setNotification(`new anecdote: ${anecdote}`));
        setTimeout(() => {
          dispatch(setNotification(null));
        }, 5000);
      });
  };
  return (
    <form onSubmit={newAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="note" />
      </div>
      <button>create</button>
    </form>
  );
};

export default AnecdoteForm;
