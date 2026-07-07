import express from "express";
import jwtVerification from "./../middleware/JWTVerification.middleware.js";
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject
} from "../controlls/project.controlls.js";
const router = express.Router();
router.post("/create", jwtVerification, createProject);
router.get("/get", jwtVerification, getProjects);
router.put("/update/:id", jwtVerification, updateProject);
router.delete("/delete/:id", jwtVerification, deleteProject);
export default router;
