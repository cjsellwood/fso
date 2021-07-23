import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/anecdotes").then((response) => {
      dispatch(initializeAnecdotes(response.data));
    });
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
