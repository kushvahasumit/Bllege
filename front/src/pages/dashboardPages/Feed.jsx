// src/components/Feed.js
import React, { useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { usePostStore } from "../../store/postStore";
import { useNavigate } from "react-router-dom";
import Post from "../../components/Post.jsx";
import { useAuthStore } from "../../store/authStore.js";

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
  const {user,isAuthenticated} = useAuthStore();

  useEffect(() => {
    fetchAllPost();
    listenForPostLikes();
  }, [fetchAllPost, listenForPostLikes]);

  const handleStartPost = (value)=>{
    if(value === "/createpost" && !isAuthenticated){
      navigate("/sign-up");
    }else{
      navigate(value);
    }

  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <StartPost onClick={() => handleStartPost("/createpost")} />
      <div className="mt-6 mb-20 overflow-y-auto h-[calc(75vh-5px)] custom-scrollbar">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error loading posts: {error}</p>}
        {!isLoading ? (
          posts && posts.length > 0 ? (
            posts.map((post) =>
              post && post._id ? (
                <Post
                  key={post._id}
                  post={post}
                  likePost={() => likePost(post._id, post.isLiked, user._id)}
                />
              ) : null
            )
          ) : (
            <p>No posts available.</p>
          )
        ) : (
          <p>Fetching...</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
