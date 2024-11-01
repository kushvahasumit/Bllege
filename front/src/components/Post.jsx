import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { usePostStore } from "../store/postStore"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const handleShare = (postUrl) => {
//   navigator.clipboard
//     .writeText(postUrl)
//     .then(() => {
//       toast.success("Link copied to clipboard!", {
//         position: "top-left",
//         autoClose: 3000,
//       });
//     })
//     .catch((error) => {
//       console.error("Error copying link: ", error);
//       toast.error("Failed to copy the link.");
//     });
// };


const Post = ({ post, likePost }) => {
//   const { deletePost } = usePostStore(); 
//   const [showDropdown, setShowDropdown] = useState(false);
//   const handleDelete = async () => {
//     await deletePost(post._id);
//     window.location.reload(); 
//   };

 
    const postUrl = `http://localhost:5173/post/${post._id}`;

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4 shadow-md bg-white relative">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
          <img
            src="../src/images/bgrsm.png"
            alt={post.section}
            className="w-8 h-8"
          />
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

        {/* Three Dots Menu */}
        {/* <div className="relative">
          <button
            className="flex items-center text-gray-500 hover:text-blue-500"
            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
          >
            <MoreHorizontal />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={handleDelete}
                className="block px-4 py-2 text-red-500 hover:bg-red-100 w-full text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div> */}

        <button
          // onClick={handleShare(postUrl)}
          className="flex items-center text-gray-500"
        >
          <Share2 className="mr-1 text-lostSouls" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
