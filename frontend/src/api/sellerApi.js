import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/seller",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("sellerToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const addProduct = (formData) => API.post("/sell", formData);
export const getSellerProducts = () => API.get("/products");
export const deleteProduct = (id) => API.delete(`/product/${id}`);
