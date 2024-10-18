import React, { useEffect, useState } from "react";
import { PlusCircle, MessageCircle, Eye, Share2, HeartIcon } from "lucide-react";
import { usePostStore } from "../../store/postStore";
import { formatDistanceToNow } from "date-fns";

const StartPost = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full bg-white shadow-md flex items-center space-x-4">
      <PlusCircle className="text-lostSouls h-8 w-8" />
      <span className="text-gray-700 font-medium">Start a Post ...</span>
    </div>
  );
};

const Feed = () => {
  const {posts, fetchAllPost,likePost, listenForPostLikes, isLoading, error} = usePostStore();
  //  const [page, setPage] = useState(1);
  console.log(posts)
  // console.log(page)
  useEffect(
    (page) => {
      fetchAllPost();
      listenForPostLikes();
      // const handleScroll = () => {
      //   if (
      //     window.innerHeight + document.documentElement.scrollTop !==
      //       document.documentElement.offsetHeight ||
      //     isLoading
      //   ) {
      //     return;
      //   }
      //   setPage((prevPage) => prevPage + 1);
      // };

      // window.addEventListener("scroll", handleScroll);
      // return () => {
      //   window.removeEventListener("scroll", handleScroll);
      // };
    },
    [fetchAllPost, listenForPostLikes]
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <StartPost />
      <div className="mt-6 mb-16 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar ">
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
                  {/* <img
                    src="../../images/cover pic.jpg"
                    alt={post.section}
                    className="w-8 h-8"
                  /> */}
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center">
                    {post.section}
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">
                      {formatDistanceToNow(new Date(post.createdAt), {
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
                  <button
                    onClick={() => likePost(post._id, post.isLiked)}
                    className={`flex items-center text-gray-500`}
                  >
                    <HeartIcon
                      className={`mr-1 hover:fill-lostSouls ${
                        post.isLiked ? "fill-lostSouls" : "text-lostSouls"
                      }`}
                    />
                    <span>{post.likes} Likes</span>
                  </button>
                  <button className="flex items-center text-gray-500">
                    <MessageCircle className="mr-1 text-lostSouls" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>
                <button className="flex items-center text-gray-500 hover:text-blue-500">
                  <Share2 className="mr-1 text-lostSouls" />
                  <span>Share</span>
                </button>
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