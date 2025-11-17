import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1/seller",
  // withCredentials: true, // <-- enable only if you rely on cookies and server sets Access-Control-Allow-Credentials
});

// attach token from localStorage to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("sellerToken");
  if (token) req.headers["Authorization"] = `Bearer ${token}`;
  return req;
});

// global 401 handler -> clear token and redirect to signin
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("sellerToken");
      window.location.href = "/seller/signin";
    }
    return Promise.reject(err);
  }
);

// Client-side Cloudinary upload (optional fallback)
export async function uploadImageToCloudinary(file) {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryUrl =
    process.env.REACT_APP_CLOUDINARY_URL ||
    (cloudName ? `https://api.cloudinary.com/v1_1/${cloudName}/image/upload` : null);

  if (!cloudinaryUrl) {
    throw new Error(
      "Cloudinary configuration missing. Set REACT_APP_CLOUDINARY_CLOUD_NAME or REACT_APP_CLOUDINARY_URL."
    );
  }
  if (!uploadPreset) {
    throw new Error(
      "Cloudinary upload preset missing. Set REACT_APP_CLOUDINARY_UPLOAD_PRESET."
    );
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);

  const resp = await axios.post(cloudinaryUrl, data);
  return resp.data;
}

// addProduct supports:
//  - FormData (sent as multipart/form-data -> server multer handles file)
//  - plain object (if contains File, client uploads to Cloudinary first then sends JSON)
export const addProduct = async (product) => {
  // If the caller passed a FormData instance -> forward as multipart
  if (product instanceof FormData) {
    const resp = await API.post("/sell", product /* do NOT set Content-Type manually */);
    return resp.data;
  }

  // Otherwise, handle fallback: if product.image is a File, perform client-side upload
  const payload = { ...product };
  try {
    if (payload.image && payload.image instanceof File) {
      const uploaded = await uploadImageToCloudinary(payload.image);
      payload.image = uploaded.secure_url || uploaded.url || "";
      payload.imagePublicId = uploaded.public_id || "";
    }
  } catch (err) {
    throw new Error("Image upload failed: " + (err.message || err));
  }

  const resp = await API.post("/sell", payload);
  return resp.data;
};

export const getSellerProducts = async () => {
  const resp = await API.get("/products");
  return resp.data;
};

export const deleteProduct = async (id) => {
  const resp = await API.delete(`/product/${id}`);
  return resp.data;
};

export const signupSeller = async (payload) => {
  const resp = await API.post("/signup", payload);
  const data = resp.data;
  if (data?.token) localStorage.setItem("sellerToken", data.token);
  return data;
};

export const loginSeller = async (payload) => {
  const resp = await API.post("/signin", payload);
  const data = resp.data;
  if (data?.token) localStorage.setItem("sellerToken", data.token);
  return data;
};
