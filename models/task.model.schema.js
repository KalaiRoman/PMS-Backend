import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    description: {
      type: String
    },
    image: {
      type: String
    },
    updateUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    status: {
      type: String,
      enum: [
        "Open",
        "Done",
        "Cancelled",
        "Not Fix Required",
        "In Test",
        "Ready For Release",
        "on Hold"
      ],
      default: "Open"
    },
    discussion: [
      {
        message: {
          type: String
        },
      }
    ],
    impacteEnv: {
      type: String,
      enum: ["DEV", "SIT", "Prod", "Staging", "UAT"],
      default: "DEV"
    },
    currentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("task", taskSchema);
