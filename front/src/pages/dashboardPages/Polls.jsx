import React, { useEffect } from "react";
import { usePostStore } from "../../store/postStore";
import Post from "../../components/Post";

const Polls = () => {
  const {
    pollPosts,
    fetchPollPosts,
    likePost,
    listenForPostLikes,
    isLoading,
    error,
  } = usePostStore();

  useEffect(() => {
    fetchPollPosts();
    listenForPostLikes();
  }, [fetchPollPosts, listenForPostLikes]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mt-6 mb-16 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
        {isLoading && <p>Loading polls...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && pollPosts.length === 0 && <p>No polls available.</p>}
        {!isLoading &&
          pollPosts.length > 0 &&
          pollPosts.map((post) =>
            post && post._id ? (
              <Post key={post._id} post={post} likePost={likePost} />
            ) : null
          )}
      </div>
    </div>
  );
};

export default Polls;