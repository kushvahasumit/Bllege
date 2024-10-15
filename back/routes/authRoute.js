import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
  checkAuth,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { createPost, getAllPost, getSectionPosts, getUserPost } from "../controller/postController.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.post("/verify-email", verifyEmail);

router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/createPost",createPost);

router.get("/getAllPosts", getAllPost);

router.get("/getUserPosts/:userId", getUserPost);

router.get('/:section',getSectionPosts);

export default router;