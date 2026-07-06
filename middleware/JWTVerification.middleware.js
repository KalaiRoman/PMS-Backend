import jwt from "jsonwebtoken";
import userModelSchema from "../models/user.model.schema.js";
import envFile from "./../utils/EnvConfig.js";
envFile;
const jwtVerification = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Authorization header is missing"
      });
    }
    const token = authHeader.split(" ")[0];
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token is missing"
      });
    }

    jwt.verify(token, process.env.SECREATE_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            status: false,
            message: "Token has expired"
          });
        }
        return res.status(401).json({
          status: false,
          message: "Invalid token"
        });
      }
      const user = await userModelSchema.findById({ _id: decoded._id });
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

export default jwtVerification;
