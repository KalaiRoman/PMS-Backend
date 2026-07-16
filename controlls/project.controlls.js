import mongoose from "mongoose";
import { useError } from "../helpers/useError.js";
import projectModelSchema from "../models/project.model.schema.js";
import userModelSchema from "../models/user.model.schema.js";

const createProject = async (req, res) => {
  try {
    const {
      projectName,
      clientName,
      projectLead,
      description,
      users = []
    } = req.body;
    if (req.user.role === "User") {
      return res.status(403).json({
        status: false,
        message:
          "You don't have permission to add a project. Please contact your administrator for access."
      });
    }
    const response = await projectModelSchema.create({
      projectName,
      clientName,
      projectLead,
      description,
      users,
      user: req.user._id
    });
    if (users.length > 0) {
      await userModelSchema.updateMany(
        {
          _id: {
            $in: users.map(id => new mongoose.Types.ObjectId(id))
          }
        },
        {
          $push: {
            userAssignedProjects: response._id,
            notification: {
              message: "New project created. Development has started",
              project: response._id,
              isRead: false
            }
          }
        }
      );
    }

    return res.status(201).json({
      status: true,
      message: "Project created successfully.",
      project: response
    });
  } catch (error) {
    return useError(res, 500, `${error}`);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRoles = ["User"];
    if (userRoles.includes(req.user.role))
      return res.status(404).json({
        status: true,
        message: "Your Not allowed to add Project Please Contact Admin!..."
      });
    const update = await projectModelSchema.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: true,
      message: "Project Updated Successfully...!",
      project: update
    });
  } catch (error) {
    return useError(res, 404, `${error}`);
  }
};
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userRoles = ["User"];
    if (userRoles.includes(req.user.role))
      return res.status(404).json({
        status: true,
        message:
          "You don't have permission to add a project. Please contact your administrator for access."
      });
    const update = await projectModelSchema.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      status: true,
      message: "Project Deleted Successfully"
    });
  } catch (error) {
    return useError(res, 404, `${error}`);
  }
};

const getProjects = async (req, res, next) => {
  try {
    let response;
    if (req.user.role == "Admin" || req.user.role == "subAdmin") {
      response = await projectModelSchema
        .find()
        .populate("users", "email avatar name role");
    }
    else
    {
        response = await projectModelSchema
        .find()
        .populate("user", "email avatar name role");
    }
    return res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    return useError(res, 404, `${error}`);
  }
};
export { createProject, getProjects, updateProject, deleteProject };
