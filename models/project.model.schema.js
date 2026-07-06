import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is Required"]
    },
    projectName: {
      type: String,
      required: [true, "project Name is Required"],
      unique: true
    },
    clientName: {
      type: String,
      required: [true, "client Name is Required"]
    },
    projectLead: {
      type: String,
      required: [true, "project Lead is Required"]
    },
    description: {
      type: String,
      minLen: 1,
      max: 1000,
      required: [true, "Description is Required"]
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        unique: true
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("project", projectSchema);
