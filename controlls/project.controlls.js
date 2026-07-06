import { useError } from "../helpers/useError.js";
import projectModelSchema from "../models/project.model.schema.js";

const createProject = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const {
      projectName,
      clientName,
      projectLead,
      description,
      users
    } = req.body;
    const response = await projectModelSchema.create({
      projectName,
      projectLead,
      clientName,
      description,
      users,
      user: req.user._id
    });
    return res.status(201).json({
      status: true,
      message: "Project Created Successfully",
      projects: response
    });
  } catch (error) {
    return useError(res, 404, `${error}`);
  }
};

const getProjects = async (req, res, next) => {
  try {
    const response = await projectModelSchema.find().populate("users", "email");
    return res
      .status(200)
      .json({ message: "Project Lits", status: true, projects: response });
  } catch (error) {
    return useError(res, 404, `${error}`);
  }
};

export { createProject, getProjects };
