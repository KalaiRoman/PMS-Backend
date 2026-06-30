import express from "express";
import {
  changePassword,
  login,
  register,
  updateAvatar,
  updatePofile
} from "../controlls/user.controlls.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", updatePofile);
router.patch("/update-image", updateAvatar);
router.patch("/change-password", changePassword);

export default router;
