const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });
    await setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: null,
      });
    }, 1000 * time);
  };
};

export default notificationReducer;
