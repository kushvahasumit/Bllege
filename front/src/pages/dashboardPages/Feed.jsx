import React, { useEffect } from "react";
import { PlusCircle } from "lucide-react"; // Import PlusCircle from Lucide
import { usePostStore } from "../../store/postStore";
import { formatDistanceToNow } from "date-fns";

const StartPost = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-md flex items-center space-x-4">
      <PlusCircle className="text-lostSouls h-8 w-8" /> {/* Round + sign */}
      <span className="text-gray-700 font-medium">Start a Post ...</span>
    </div>
  );
};

const Feed = () => {
  const {posts, fetchAllPost, isLoading, error} = usePostStore();
  console.log(posts)
  useEffect(()=>{
    fetchAllPost();
  },[fetchAllPost]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <StartPost />
      <div className="mt-6">
        {isLoading && <p>Loading posts...</p>}
        {error && <p>Error loading posts: {error}</p>}

        {!isLoading ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="p-4 border border-gray-200 rounded-lg mb-4 shadow-md bg-white"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                  <img
                    src="/path-to-logo.png"
                    alt={post.section}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center">
                    {post.section}
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">
                      {formatDistanceToNow (new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center">
                    {post.user.college}
                    <span className="mx-2">•</span>
                    {post.user.name}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-lg mb-1">{post.topic}</h3>
                <p className="text-gray-700">{post.content}</p>
              </div>

              <div className="flex justify-between items-center mt-4 border-t pt-2">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <i className="fas fa-thumbs-up mr-1"></i>
                    <span>{post.likes} Likes</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-blue-500">
                    <i className="fas fa-comment-dots mr-1"></i>
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>
                <div className="flex items-center text-gray-500">
                  <i className="fas fa-eye mr-1"></i> {/* Views Icon */}
                  <span>{post.views} Views</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;