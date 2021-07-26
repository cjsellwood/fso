import usersService from "../services/users";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return action.users;

    default:
      return state;
  }
};

const setUsers = (users) => {
  return {
    type: "SET_USERS",
    users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};
