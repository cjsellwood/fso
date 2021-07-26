import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...action.user,
      };
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    user,
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password);

      localStorage.setItem("blog-list-user", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(setUser(user));
    } catch (error) {
      throw new Error("Wrong username or password");
    }
  };
};

export default userReducer;
