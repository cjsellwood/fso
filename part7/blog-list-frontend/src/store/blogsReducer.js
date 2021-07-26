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
    case "DELETE_BLOG": {
      const blogsCopy = [...state];
      const filtered = blogsCopy.filter((blog) => blog.id !== action.id);
      return [...filtered];
    }

    case "LIKE_BLOG": {
      const blogsCopy = [...state];
      const likedBlogs = blogsCopy.map((blog) => {
        if (blog.id === action.blog.id) {
          return {
            ...blog,
            likes: action.blog.likes,
          };
        } else {
          return {
            ...blog,
          };
        }
      });

      return [...likedBlogs];
    }
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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog };
    updatedBlog.likes = updatedBlog.likes + 1;
    updatedBlog.user = updatedBlog.user.id;

    try {
      const result = await blogService.update(updatedBlog);

      dispatch({
        type: "LIKE_BLOG",
        blog: result,
      });

      dispatch(setSuccess(`Blog liked: ${result.title}`));
    } catch (error) {
      dispatch(setError(error.response.data.error));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    if (!window.confirm("Are you sure you want to delete blog")) {
      return;
    }
    try {
      await blogService.deleteBlog(id);
      dispatch({
        type: "DELETE_BLOG",
        id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default blogsReducer;
