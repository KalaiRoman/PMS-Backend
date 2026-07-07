import express from "express";
import userRouter from "./user.routes.js";
import projectRouter from "./project.routes.js";
import taskRouter from "./task.routes.js";
import chatRouter from "./chat.routes.js";

const router = express.Router();
router.use("/auth", userRouter);
router.use("/project", projectRouter);
router.use("/task", taskRouter);
router.use("/chat", chatRouter);

export default router;
