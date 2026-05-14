import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2929/api",
  withCredentials: true,
});

export default API;