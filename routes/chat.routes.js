import express from "express";
import jwtVerification from "./../middleware/JWTVerification.middleware.js";
import {
  creatMessage,
  getUserMessages,
  updateMessage
} from "../controlls/chat.controlls.js";
import upload from "../utils/Multer.utils.js";
const router = express.Router();
router.post("/create", jwtVerification, upload.single("image"), creatMessage);
router.get("/get", jwtVerification, getUserMessages);
router.patch("/update/:id", jwtVerification, updateMessage);

export default router;
