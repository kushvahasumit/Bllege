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

const authRouters = express.Router();

authRouters.get("/check-auth", verifyToken, checkAuth);

authRouters.post("/signup",signup);

authRouters.post("/login",login);

authRouters.post("/logout",logout);

authRouters.post("/verify-email", verifyEmail);

authRouters.post("/forget-password", forgetPassword);

authRouters.post("/reset-password/:token", resetPassword);

export default authRouters;