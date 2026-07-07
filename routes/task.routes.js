import express from "express";
import { createTask } from "../controlls/task.controlls.js";
import jwtVerification from "../middleware/JWTVerification.middleware.js";
import upload from "../utils/Multer.utils.js";
const router = express.Router();

router.post("/create", jwtVerification,upload.single("image"), createTask);


export default router;
