import express from "express";
import upload from "./../utils/Multer.utils.js";
import {
  changePassword,
  forgotPassword,
  login,
  register,
  resetPassword,
  updateAvatar,
  updatePofile
} from "../controlls/user.controlls.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", updatePofile);
router.patch("/update-image/:id", upload.single("image"), updateAvatar);
router.patch("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export default router;
