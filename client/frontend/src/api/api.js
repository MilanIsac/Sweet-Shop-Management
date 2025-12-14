import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// SWEETS
export const fetchSweets = () => API.get("/sweets");
export const createSweet = (data) => API.post("/sweets", data);
export const updateSweet = (id, data) => API.put(`/sweets/${id}`, data);
export const deleteSweet = (id) => API.delete(`/sweets/${id}`);

// ✅ ADMIN
export const getAdminStats = () => API.get("/admin/stats");

export default API;
