import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeartIcon } from "lucide-react";
import { usePostStore } from "../../store/postStore";
import { useAuthStore } from "../../store/authStore";
import Post from "../../components/Post";
import { toast } from "react-toastify";

const PostDetail = () => {
  const { postId } = useParams();
  const {
    post,
    fetchPostById,
    addComment,
    likeComment,
    loading,
    error,
    likePost,
    listenForPostLikes,
  } = usePostStore();
  const { user } = useAuthStore();

  console.log("this is post",post)

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPostById(postId);
    listenForPostLikes();
  }, [postId, fetchPostById, listenForPostLikes]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment(postId, user._id, commentText);
      toast.success("Comment added successfully!");
      setCommentText("");
    } catch (err) {
      toast.error("Failed to add comment.");
    }
  };

    const handleLikeComment = async (commentId) => {
    if (post?._id && user?._id) {
        await likeComment(post._id, commentId, user._id);
        toast.success("Liked the comment!");
    } else {
        toast.error("Unable to like the comment.");
    }
    };

  const handleLikePost = async (commentId) => {
    try {
      await likePost(post._id, commentId, user._id);
      toast.success("Liked the post!");
    } catch (err) {
      toast.error("Failed to like the post.");
    }
  };

  if (loading) return <div>Loading post details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-4 border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden">
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <PostHeader post={post} likePost={handleLikePost} />
        <PostComments
          comments={post.comments}
          likeComment={handleLikeComment}
          userId={user._id}
        />
      </div>
      <CommentInput
        commentText={commentText}
        setCommentText={setCommentText}
        onCommentSubmit={handleCommentSubmit}
        userId={user._id}
      />
    </div>
  );
};

const PostHeader = ({ post, likePost }) => (
  <div className="mb-4">
    <Post post={post} likePost={likePost} />
  </div>
);

const PostComments = ({ comments = [], likeComment, userId }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    <h3 className="font-bold text-xl mb-4">Comments</h3>
    <ul className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => {
          const isLiked = comment.likes.includes(userId);
          return (
            <li
              key={comment._id}
              className="border-b pb-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {comment.username}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-800">{comment.comment}</p>
              </div>
              <button
                onClick={() => likeComment(comment._id)}
                className="text-gray-500 flex items-center"
              >
                <HeartIcon
                  className={`mr-1 hover:fill-lostSouls ${
                    isLiked ? "fill-lostSouls" : ""
                  }`}
                />
                <span>{comment.likes.length || 0} Likes</span>
              </button>
            </li>
          );
        })
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </ul>
  </div>
);

const CommentInput = ({ commentText, setCommentText, onCommentSubmit }) => (
  <div className="flex border p-2 border-lostSouls rounded-lg items-center h-24 mb-18">
    <input
      type="text"
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      placeholder="Add a comment"
      className="border rounded p-2 flex-1"
    />
    <button
      onClick={onCommentSubmit}
      className="ml-2 bg-lostSouls text-white px-4 py-2 rounded"
    >
      Comment
    </button>
  </div>
);

export default PostDetail;
