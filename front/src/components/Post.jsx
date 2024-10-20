import React from "react";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircle, Share2 } from "lucide-react";

const Post = ({ post, likePost }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4 shadow-md bg-white">
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
  );
};

export default Post;