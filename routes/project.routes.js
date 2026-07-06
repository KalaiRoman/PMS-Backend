import express from "express";
import jwtVerification from "./../middleware/JWTVerification.middleware.js";
import { createProject, getProjects } from "../controlls/project.controlls.js";

const router = express.Router();
router.post("/create", jwtVerification, createProject);
router.post("/get", jwtVerification, getProjects);

export default router;
