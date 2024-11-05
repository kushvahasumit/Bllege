import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";

const API_URL = "http://localhost:5000";
const socket = io(API_URL, {
  transports: ["websocket"],
  reconnection: true,
});

axios.defaults.withCredentials = true;
export const usePostStore = create((set) => ({
  following: [],
  posts: [],
  trendingPosts: [],
  sectionPosts: [],
  messages: [],
  loading: false,
  error: null,
  votes: {},
  pollPosts: [],
  post: null,

  fetchAllPost: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/api/post/getAllPosts`);
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

  fetchPostById: async (postId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/api/post/${postId}`);
      set({ post: response.data, loading: false, error: null });
    } catch (error) {
      set({ post: null, loading: false, error: error.message });
    }
  },

  createPost: async (postData) => {
    set({ loading: true, error: null });

    try {
      const {
        userId,
        section,
        topic,
        content,
        isPoll,
        pollQuestion,
        pollOptions,
      } = postData;

      const handleLoad = {
        userId,
        section,
        isPoll,
        pollQuestion: isPoll ? pollQuestion : undefined,
        pollOptions: isPoll ? pollOptions : undefined,
        topic: !isPoll ? topic : undefined,
        content: !isPoll ? content : undefined,
      };

      console.log("Post Data:", handleLoad);

      const response = await axios.post(
        `${API_URL}/api/post/createPost`,
        postData
      );
      console.log("Response Data:", response.data);
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
      const response = await axios.post(`${API_URL}/api/post/${postId}/like`);
      console.log("This is like response", response.data);

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

        trendingPosts: state.trendingPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !isLiked,
              }
            : post
        ),

        sectionPosts: state.sectionPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !isLiked,
              }
            : post
        ),

        pollPosts: state.pollPosts.map((post) =>
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
      console.error(
        "Error liking the post:",
        error.response?.data || error.message
      );
    }
  },

  listenForPostLikes: () => {
    socket.on("postLiked", (updatedPost) => {
      set((state) => {
        const updatedTrendingPosts = state.trendingPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );

        const updatedAllPosts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );

        const updateSectionPost = state.sectionPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );

        return {
          sectionPosts: updateSectionPost,
          trendingPosts: updatedTrendingPosts,
          posts: updatedAllPosts,
        };
      });
    });
  },

  addComment: async (postId, userId, comment) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/post/${postId}/comment`,
        {
          userId,
          comment,
        }
      );
      set((state) => ({
        post: {
          ...state.post,
          comments: [...state.post.comments, response.data.comment],
        },
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },

  likeComment: async (postId, commentId, userId) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/post/${postId}/comments/${commentId}/like`,
        { userId }
      );

      set((state) => ({
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, likes: response.data.comment.likes }
              : comment
          ),
        },
      }));
    } catch (error) {
      console.error("Error liking/unliking comment:", error);
    }
  },

  fetchTrendingPosts: async (limit = 50) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/api/post/getAllPosts`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const allPosts = await response.json();

      const sortedPosts = allPosts.sort((a, b) => b.likes - a.likes);
      const topPosts = sortedPosts.slice(0, limit);

      set({ trendingPosts: topPosts, isLoading: false, error: null });
    } catch (error) {
      console.error("Error fetching trending posts:", error);
      set({ error: "Failed to fetch trending posts", isLoading: false });
    }
  },

  fetchSectionPosts: async (sectionhead, section) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/api/post/section/${section}`
      );
      set({ sectionPosts: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching posts",
        isLoading: false,
      });
    }
  },

  fetchPollPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/post/poll/getAllPolls`);
      set({ pollPosts: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  // deletePost: async (postId)=>{
  //   console.log(postId);
  //  try {
  //   const response = await axios.delete(`${API_URL}/${postId}`);
  //   console.log(response.data);

  //   return response.data;
  //  } catch (error) {
  //   console.error("Error in deleting the post:", error.response.data);
  //  }
  // }

  toggleFollow: (userId) =>
    set((state) => ({
      following: state.following.includes(userId)
        ? state.following.filter((id) => id !== userId)
        : [...state.following, userId],
    })),

  setVote: (postId, optionIndex) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [postId]: optionIndex,
      },
    })),

  getVote: async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/api/post/getAllPosts`);

      if (response && response.data) {
        const votes = response.data.votes;
        return votes ? votes[postId] || null : null;
      } else {
        console.error("Response data is undefined or malformed");
        return null;
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
      return null;
    }
  },

  joinRoom: (collegeName) => {
    socket.emit("joinRoom", collegeName);
  },

  sendMessage: (collegeName, message) => {
    socket.emit("chatMessage", { collegeName, message }, (response) => {
      if (response.success) {
        set((state) => ({ messages: [...state.messages, message] }));
      }
    });
  },

  listenForChatMessages: () => {
    socket.on("chatMessage", (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });
  },

  leaveRoom: (room) => {
    socket.emit("leaveRoom", room); // Emit leave room event
    set({ messages: [] }); // Clear messages or handle state as needed
  },

  disconnectSocket: () => {
    socket.disconnect(); // Disconnect the socket
    console.log("Socket disconnected");
  },
}));
