import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircle, Share2 } from "lucide-react";
import { usePostStore } from "../store/postStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import bgrsmImage from "../images/bgrsm.png";
import { useAuthStore } from "../store/authStore";

const Post = ({ post, likePost }) => {
  const { setVote, getVote } = usePostStore();
  const { user } = useAuthStore();
  const [userVote, setUserVote] = useState(null);
  const [pollOptions, setPollOptions] = useState(post.pollOptions);
  const [votesVisible, setVotesVisible] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000";
  useEffect(() => {
    const fetchVote = async () => {
      const vote = await getVote(post._id);
      setUserVote(vote);
    };
    fetchVote();
  }, [getVote, post._id]);

  const openComments = () => {
    navigate(`/post/${post._id}/comment`);
  };

  const handleVote = async(optionIndex) => {
    if (userVote !== null) {
      toast.error("You have already voted on this post.");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/post/vote`, {
        postId: post._id,
        optionIndex: optionIndex,
      });

      setVote(post._id, optionIndex);

      // Increase the vote count for the selected option
      const updatedOptions = [...pollOptions];
      updatedOptions[optionIndex].votes += 1; // Increment vote count
      setPollOptions(updatedOptions); // Update local state

      setUserVote(optionIndex); // Update local state
      setVotesVisible(true); // Show the vote counts
      toast.success("Vote recorded!", {
        position: "top-left",
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to record vote. Please try again.");
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4 shadow-md bg-white relative">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
          <img
            src={bgrsmImage}
            alt={post.section}
            className="w-8 h-8 rounded-full object-cover"
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
        <h3 className="font-bold text-lg mb-1">
          {post.isPoll ? post.pollQuestion : post.topic}
        </h3>
        <p className="text-gray-700">{post.isPoll ? null : post.content}</p>
      </div>

      {post.isPoll && (
        <ul className="mb-4 bg-gray-100 p-2 rounded-md">
          {pollOptions.map((option, index) => (
            <li
              key={index}
              className={`flex justify-between py-2 px-3 rounded-md border-b border-gray-300 cursor-pointer mb-1 bg-offWhite hover:bg-slate-200 transition duration-200 ${
                userVote === index ? "bg-slate-200" : ""
              }`}
              onClick={() => handleVote(index)}
            >
              <span>{option.optionText}</span>
              <span className="text-gray-500">
                {votesVisible
                  ? userVote === index
                    ? `${option.votes} votes`
                    : `${option.votes} votes`
                  : null}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center mt-4 border-t pt-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => likePost(post._id, post.isLiked, user._id)}
            className={`flex items-center text-gray-500`}
          >
            <HeartIcon
              className={`mr-1 hover:fill-lostSouls transition-colors duration-200 ${
                post.isLiked ? "fill-lostSouls" : "text-lostSouls"
              }`}
            />
            <span>
              {Array.isArray(post.likes) ? post.likes.length : 0}Likes
            </span>
          </button>
          <button
            onClick={openComments}
            className="flex items-center text-gray-500"
          >
            <MessageCircle className="mr-1 text-lostSouls" />
            <span>{post.comments.length} Comments</span>
          </button>
        </div>

        <button className="flex items-center text-gray-500">
          <Share2 className="mr-1 text-lostSouls" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
