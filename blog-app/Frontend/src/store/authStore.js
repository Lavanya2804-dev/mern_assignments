import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  // LOGIN
  login: async (userCredObj) => {
  try {
    set({ loading: true, error: null });

    const res = await axios.post(
      "http://localhost:4000/common-api/login",
      userCredObj,
      { withCredentials: true }
    );

    set({
      loading: false,
      isAuthenticated: true,
      currentUser: res.data.payload.user,
    });

  } catch (err) {
    set({
      loading: false,
      isAuthenticated: false,
      currentUser: null,
      error: err.response?.data?.error || "Login failed",
    });
  }
},

  // LOGOUT
  logout: async () => {
    try {
      set({ loading: true, error: null });

      await axios.get(
        "http://localhost:4000/common-api/logout",
        { withCredentials: true }
      );

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },

  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("http://localhost:4000/common-api/check-auth", { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  }
}));