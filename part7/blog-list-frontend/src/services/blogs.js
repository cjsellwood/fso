import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (tokenInput) => {
  token = `bearer ${tokenInput}`;
};

const getAll = async () => {
  const req = await axios.get(baseUrl);
  return req.data;
};

const create = async (newBlog) => {
  const res = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
  });
  return res.data;
};

const update = async (updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, {
    headers: { Authorization: token },
  });
  return res.data;
};

const deleteBlog = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  });
  return res.data;
};

const addComment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return res.data;
};

export default { getAll, create, setToken, update, deleteBlog, addComment };
