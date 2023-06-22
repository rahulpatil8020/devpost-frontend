import axios from "axios";

const API = axios.create({
  baseURL: "https://scholar-api-5pjo.onrender.com",
});

export const signup = (formData) => API.post("/api/v1/user/signup", formData);
export const login = (formData) => API.post("/api/v1/user/login", formData);
export const subscribe = (user) =>
  API.patch(`/api/v1/user/${user._id}/subscribe`, user);
export const getUser = (userId) => API.get(`/api/v1/user/${userId}`);
export const unsubscribe = (userId) =>
  API.patch(`/api/v1/user/${userId}/unsubscribe`);
