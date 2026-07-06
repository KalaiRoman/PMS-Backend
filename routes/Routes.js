import express from "express";
import userRouter from "./user.routes.js";
import projectRouter from "./project.routes.js";
const router = express.Router();
router.use("/auth", userRouter);
router.use("/project", projectRouter);
export default router;
