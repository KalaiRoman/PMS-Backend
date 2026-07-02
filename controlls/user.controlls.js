import { useComparePassword, useGeneratePassword } from "../helpers/passwordBcrypt.js";
import useTokenGenerate from "../helpers/tokenGenerate.js";
import { useError } from "../helpers/useError.js";
import userModelSchema from "../models/user.model.schema.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import {
  sendForgotPasswordEmail,
  generateResetToken,
} from "../helpers/Email.helpers.js";
 

const register = async (req, res, next) => {
  try {
    const { name, email, password, role, userStatus } = req.body;
    const existUser = await userModelSchema.findOne({ email });
    if (existUser) {
      return useError(res, 409);
    }
    const hashPassword = await useGeneratePassword(password);
    const response = await userModelSchema.create({
      name,
      email,
      password: hashPassword,
      role,
      userStatus
    });
    const token = await useTokenGenerate(response);
    return res.status(201).json({
      status: true,
      message: "User Register Successfully",
      user: response,
      token: token
    });
  } catch (error) {
    console.log(error);
    return useError(res, 404, `${error}`);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await userModelSchema.findOne({ email });
    if (existUser) {
      const response={
        _id:existUser?._id,
        name:existUser?.name,
        email:existUser?.email,
        role:existUser?.role
      }
    const token = await useTokenGenerate(response);
    const comparePassword=await useComparePassword(password,existUser?.password);

    if(comparePassword)
    {
return res.status(200).json({
  message:"User Login Successfully",
  statusCode:200,
  user:existUser,
  token:token
})
    }
    else
    {
      return useError(res,404,"Wrong Password")
    }

    }
    else
    {
      return useError(res, 404);

    }
  } catch (error) {
    return useError(res, 404, `${error}`);

  }
};

const updatePofile = async (req, res, next) => {
  try {
  } catch (error) {
    return useError(res, 404, `${error}`);

  }
};

const updateAvatar = async (req, res, next) => {
  try {
    console.log(req.file.path)
    const avatarUpdate=await userModelSchema.findByIdAndUpdate({_id:req.params.id},{avatar:req.file.path},{new:true});
    return res.status(200).json({status:true,message:"User Image Updated Successfully",statusCode:200})
  } catch (error) {
    return useError(res, 404, `${error}`);

  }
};

const changePassword = async (req, res, next) => {
  try {
  } catch (error) {
    return useError(res, 404, `${error}`);

  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
     if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
 
    const user = await userModelSchema.findOne({ email: email });
 
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, a reset link has been sent.",
      });
    }
    const resetToken  = generateResetToken();

    console.log(resetToken,"resetToken")
    const tokenExpiry = Date.now() + 15 * 60 * 1000;
    // const tokenExpiry = Date.now() + 30 * 1000;
    user.passwordResetToken  = resetToken;
    user.passwordResetExpiry = tokenExpiry;
    await user.save();
     await sendForgotPasswordEmail({
      toEmail:    user.email,
      name:       user.name,
      resetToken,
    });
    return res.status(200).json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
 
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
 
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }
 
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
 
    const user = await userModelSchema.findOne({
      passwordResetToken:  token,
      passwordResetExpiry: { $gt: Date.now() }, 
    });
 
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
 
    // 3. Hash new password
    const hashedPassword = await useGeneratePassword(newPassword);
 
    // 4. Update user — clear token fields
    user.password            = hashedPassword;
    user.passwordResetToken  = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();
 
    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
 
  } catch (error) {
    console.error("resetPassword error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export { register, login, updatePofile, updateAvatar, changePassword,forgotPassword,resetPassword };
