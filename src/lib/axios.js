import axios from "axios";

const AUTH_SERVICE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";
const CHAT_SERVICE_URL = import.meta.env.MODE === "development" ? "http://localhost:5002" : "";

// Axios instance for Auth Service (signup, login, profile, etc.)
export const authAxios = axios.create({
  baseURL: `${AUTH_SERVICE_URL}/api`,
  withCredentials: true,
});

// Axios instance for Chat Service (messages, users, etc.)
export const chatAxios = axios.create({
  baseURL: `${CHAT_SERVICE_URL}/api`,
  withCredentials: true,
});

// Add interceptor to include token in all requests
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

chatAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// For backward compatibility, export default as authAxios
export const axiosInstance = authAxios;

