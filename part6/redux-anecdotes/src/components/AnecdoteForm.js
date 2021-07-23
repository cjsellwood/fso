import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const newAnecdote = (e) => {
    e.preventDefault();

    const anecdote = e.target.note.value;
    props.addAnecdote(anecdote);

    props.setNotification(`new anecdote: ${anecdote}`, 5);
    e.target.value = "";
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
