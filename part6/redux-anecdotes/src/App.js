import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, addAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };

  const newAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.note.value;
    dispatch(addAnecdote(anecdote));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="note" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
