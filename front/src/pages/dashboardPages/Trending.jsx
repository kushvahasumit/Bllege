import React, { useEffect } from "react";
import { usePostStore } from "../../store/postStore";
import Post from "../../components/Post";

const Trending = () => {
  const {
    trendingPosts,
    fetchTrendingPosts,
    likePost,
    listenForPostLikes,
    isLoading,
    error,
  } = usePostStore();

  useEffect(() => {
    fetchTrendingPosts(50);
    listenForPostLikes();
  }, [fetchTrendingPosts,listenForPostLikes]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mt-6 mb-16 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
        {isLoading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && trendingPosts.length === 0 && (
          <p>No trending posts available.</p>
        )}
        {!isLoading &&
          trendingPosts.length > 0 &&
          trendingPosts.map((post) => (
            <Post key={post._id} post={post} likePost={likePost} />
          ))}
      </div>
    </div>
  );
};

export default Trending;
