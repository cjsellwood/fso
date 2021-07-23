import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted: ${anecdote.content}`));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
  return (
    <div>
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
    </div>
  );
};

export default AnecdoteList;
