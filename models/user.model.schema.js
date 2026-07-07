import mongoose from "mongoose";

const chatMessage = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: ["sender", "receiver"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User is required"]
  },
  message: {
    type: String,
    required: [true, "Message is required"]
  },
  emoji: [
    {
      type: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ["Not Read", "Readed"],
    default: "Not Read"
  }
});
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      min: 6,
      max: 20
    },
    avatar: {
      type: String,
      default: "https://api.dicebear.com/9.x/adventurer/svg?seed=John"
    },
    userStatus: {
      type: String,
      required: [true, "User Status is required"],
      enum: ["Active", "Blocked"],
      default: "Active"
    },
    role: {
      type: String,
      required: [true, "User Role is required"],
      enum: ["Admin", "User", "subAdmin"]
    },
    //important
    passwordResetToken: { type: String },
    passwordResetExpiry: { type: Date },
    userAssignedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
      }
    ],
    chat: chatMessage,
    yourTask: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
      }
    ]
  },
  {
    timestamps: true
  }
);
export default mongoose.model("user", userSchema);
