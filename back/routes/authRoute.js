import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.post("/verify-email", verifyEmail);

router.post("/forget-password", forgetPassword);

router.post("/reset-password/:token", resetPassword);

export default router;