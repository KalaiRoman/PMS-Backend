import { useError } from "../helpers/useError.js";
import taskModelSchema from "../models/task.model.schema.js";

const createTask = async (req, res, next) => {
  try {
    const {
      name,
      description,
      image,
      updateUser,
      status,
      discussion,
      impacteEnv
    } = req.body;

    const user = ["User"];
    if (user.includes(req.user.role)) {
      return useError(
        res,
        404,
        "You don't have permission to add a project. Please contact your administrator for access."
      );
    }
    const response = await taskModelSchema.create({
      name,
      description,
      updateUser: [],
      status,
      impacteEnv,
      discussion,
      image: req.file.path,
      currentUser: req.user._id
    });
    return res.status(201).json({
      status: true,
      message: "User Task Created Successfully",
      task: response
    });
  } catch (error) {
    console.log(error)
  }
};

export { createTask };
