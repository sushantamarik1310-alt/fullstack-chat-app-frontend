import { create } from "zustand";
import { authAxios, chatAxios } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const AUTH_SERVICE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";
const CHAT_SERVICE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5002" 
  : "https://fullstack-chat-app-chat-service.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        set({ authUser: null, isCheckingAuth: false });
        return;
      }

      const res = await authAxios.get("/auth/me");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      localStorage.removeItem("authToken");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await authAxios.post("/auth/signup", data);
      
      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await authAxios.post("/auth/login", data);
      
      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await authAxios.post("/auth/logout");
      }
      
      localStorage.removeItem("authToken");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await authAxios.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(CHAT_SERVICE_URL, {
      query: {
        userId: authUser.id,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));