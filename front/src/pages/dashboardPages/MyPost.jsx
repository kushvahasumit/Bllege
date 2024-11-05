import React, { useEffect } from "react";
import { usePostStore } from "../../store/postStore";
import Post from "../../components/Post";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const MyPost = () => {
  const {
    myPosts,
    fetchUserPosts,
    isLoading,
    error,
    likePost,
    listenForPostLikes,
    deletePost,
  } = usePostStore();
  const { user } = useAuthStore();

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully!");
      if (user && user._id) {
        fetchUserPosts(user._id);
      }
    } catch (err) {
      toast.error("Failed to delete post.");
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchUserPosts(user._id);
      listenForPostLikes();
    }
  }, [user, fetchUserPosts, listenForPostLikes]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mt-6 mb-16 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error loading posts: {error}</p>}
        {!isLoading ? (
          myPosts && myPosts.length > 0 ? (
            myPosts.map((post) =>
              post && post._id ? (
                <div key={post._id}>
                  <button
                    onClick={() => handleDeletePost(post._id)} 
                    className="text-lostSouls flex justify-center text-right w-auto p-1 cursor-pointer hover:text-red-700"
                  >
                    Delete Post
                  </button>
                  <Post
                    post={post}
                    likePost={() => likePost(post._id, post.isLiked, user._id)}
                  />
                </div>
              ) : null
            )
          ) : (
            <p>No Posts available.</p>
          )
        ) : (
          <p>Fetching...</p>
        )}
      </div>
    </div>
  );
};

export default MyPost;
