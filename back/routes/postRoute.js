import express from "express";
import { comment, createPost, deletePost, getAllPost, getPostById, getSectionPosts, getUserPost, like, likeComment, polls, vote } from "../controller/postController.js";
const postRouters = express.Router();

postRouters.post("/createPost", createPost);

postRouters.get("/getAllPosts", getAllPost);

postRouters.get("/:postId", getPostById);

postRouters.get("/getUserPosts/:userId", getUserPost);

postRouters.get("/section/:section", getSectionPosts);

postRouters.delete("/:postId", deletePost);

postRouters.post("/:postId/like", like);

postRouters.post("/:postId/comment", comment);

postRouters.post("/:postId/comments/:commentId/like", likeComment);

postRouters.post("/vote",vote);

postRouters.get("/poll/getAllPolls",polls);

export default postRouters;