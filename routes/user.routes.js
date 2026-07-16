import express from "express";
import upload from "./../utils/Multer.utils.js";
import {
  changePassword,
  forgotPassword,
  getSingleUsers,
  getUsers,
  login,
  register,
  resetPassword,
  updateAvatar,
  updatePofile,
  userChat
} from "../controlls/user.controlls.js";
import jwtVerification from "../middleware/JWTVerification.middleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", updatePofile);
router.patch(
  "/update-image/:id",
  jwtVerification,
  upload.single("image"),
  updateAvatar
);
router.patch("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/get", jwtVerification, getUsers);
router.post("/chat", jwtVerification, userChat);
router.get("/get/:id", jwtVerification, getSingleUsers);

export default router;
