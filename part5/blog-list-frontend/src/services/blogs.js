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

export default { getAll, create, setToken };
