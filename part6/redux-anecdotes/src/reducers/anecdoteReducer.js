import axios from "axios";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INITIALIZE_ANECDOTES":
      return action.anecdotes;
    case "VOTE":
      const votedAnecdote = state.find((anecdote) => anecdote.id === action.id);
      votedAnecdote.votes = votedAnecdote.votes + 1;
      const newAnecdotes = state.map((anecdote) =>
        anecdote.id === action.id ? votedAnecdote : anecdote
      );
      return newAnecdotes;
    case "ADD_ANECDOTE":
      return [...state, { ...action.anecdote }];
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/anecdotes");
    const anecdotes = response.data;
    dispatch({
      type: "INITIALIZE_ANECDOTES",
      anecdotes,
    });
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

export const addAnecdote = (anecdote) => {
  return {
    type: "ADD_ANECDOTE",
    anecdote,
  };
};

export default reducer;
