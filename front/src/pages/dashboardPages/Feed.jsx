// src/components/Feed.js
import React, { useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { usePostStore } from "../../store/postStore";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post.jsx";

const StartPost = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-md flex items-center space-x-4 hover:cursor-pointer"
    >
      <PlusCircle className="text-lostSouls h-8 w-8" />
      <span className="text-gray-700 font-medium">Start a Post ...</span>
    </div>
  );
};

const Feed = () => {
  const {
    posts,
    fetchAllPost,
    likePost,
    listenForPostLikes,
    isLoading,
    error,
  } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPost();
    listenForPostLikes();
  }, [fetchAllPost, listenForPostLikes]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <StartPost onClick={() => navigate("/createpost")} />
      <div className="mt-6 mb-16 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error loading posts: {error}</p>}
        {!isLoading ? (
          posts.map((post) => (
            <Post key={post._id} post={post} likePost={likePost} />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
