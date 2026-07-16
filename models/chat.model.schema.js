import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"]
    },
    message: {
      type: String,
      required: [true, "Message is required"]
    },
    image: {
      type: String
    },
    emoji: [
      {
        emoji: String,
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
  },
  {
    timestamps: true
  }
);

export default mongoose.model("message", chatSchema);
