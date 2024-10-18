import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/post";

axios.defaults.withCredentials = true;
export const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchAllPost: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/getAllPosts`);
      console.log(response);
      set({ posts: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error in fetching Posts",
        isLoading: false,
      });
      throw error;
    }
  },

  
}));
