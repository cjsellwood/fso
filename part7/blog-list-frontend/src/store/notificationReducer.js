const initialState = {
  error: null,
  success: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
        success: null,
      };

    case "SET_SUCCESS":
      return {
        ...state,
        success: action.success,
        error: null,
      };
    default:
      return state;
  }
};

let timeout;
export const setError = (error) => {
  return (dispatch) => {
    dispatch({
      type: "SET_ERROR",
      error,
    });

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({
        type: "SET_ERROR",
        error: null,
      });
    }, 4000);
  };
};

export const setSuccess = (success) => {
  return (dispatch) => {
    dispatch({
      type: "SET_SUCCESS",
      success,
    });

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({
        type: "SET_SUCCESS",
        error: null,
      });
    }, 4000);
  };
};

export default notificationReducer;
