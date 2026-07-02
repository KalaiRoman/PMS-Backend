import jwt from "jsonwebtoken";
import envFile from "./../utils/EnvConfig.js";
envFile;
const useTokenGenerate = async user => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.rola
    },
    process.env.SECREATE_KEY,
    {
      expiresIn: "2d"
    }
  );
};

export default useTokenGenerate;
