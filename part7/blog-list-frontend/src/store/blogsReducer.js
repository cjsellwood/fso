import blogService from "../services/blogs";
import { setSuccess, setError } from "./notificationReducer";

const initialState = [];

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_BLOGS":
      return action.blogs;
    case "ADD_BLOG":
      return [
        ...state,
        {
          ...action.blog,
          user: {
            id: action.blog.user,
            username: action.user.username,
          },
        },
      ];
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INITIALIZE_BLOGS",
      blogs,
    });
  };
};

export const addBlog = (newBlog, user) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(newBlog);
      dispatch({
        type: "ADD_BLOG",
        blog,
        user,
      });
      dispatch(setSuccess(`Blog added: ${blog.title}`));
    } catch (error) {
      dispatch(setError(error.response.data.error));
    }
  };
};

export default blogsReducer;
