const initialState = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    default:
      return state;
  }
};

let notify;
export const setNotification = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification,
    });
    clearTimeout(notify);
    notify = setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        notification: null,
      });
    }, 1000 * time);
    await notify;
  };
};

export default notificationReducer;
