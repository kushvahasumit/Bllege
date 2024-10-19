import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";

const API_URL = "http://localhost:5000/api/post";
const socket = io(API_URL, {
  transports: ["websocket"],
  reconnection: true,
});

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

  createPost: async (userId, section, topic, content) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/createPost`, {
        userId,
        section,
        topic,
        content,
      });

      set((state) => ({
        posts: [response.data.post, ...state.posts],
        loading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data.message || "Error creating post",
        loading: false,
      });
      throw error;
    }
  },

  likePost: async (postId, isLiked) => {
    try {
      const response = await axios.post(`${API_URL}/${postId}/like`);
      console.log("this is like response", response.data);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !isLiked,
              }
            : post
        ),
      }));
      return response.data;
    } catch (error) {
      console.error("Error liking the post:", error.response.data);
    }
  },

  listenForPostLikes: () => {
    socket.on("postLiked", (updatedPost) => {
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        ),
      }));
    });
  },
}));
