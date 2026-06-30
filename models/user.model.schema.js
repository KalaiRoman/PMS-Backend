import mongoose from "mongoose";
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
      enum: ["Active", "Blocked"]
    },
    role: {
      type: String,
      required: [true, "User Role is required"],
      enum: ["Admin", "User"]
    }
  },
  {
    timestamps: true
  }
);
export default mongoose.model("user", userSchema);
