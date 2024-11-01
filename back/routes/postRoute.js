import express from "express";
import { comment, createPost, deletePost, getAllPost, getSectionPosts, getUserPost, like, polls, vote } from "../controller/postController.js";
const postRouters = express.Router();

postRouters.post("/createPost", createPost);

postRouters.get("/getAllPosts", getAllPost);

postRouters.get("/getUserPosts/:userId", getUserPost);

postRouters.get("/:section", getSectionPosts);

postRouters.delete("/:postId", deletePost);

postRouters.post("/:postId/like", like);

postRouters.post("/:postId/comment", comment);

postRouters.post("/vote",vote);

postRouters.get("/poll/getAllPolls",polls);

export default postRouters;