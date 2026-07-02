import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./Cloudinary.js";
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only upload images"));
    }
    return cb(null, true);
  }
});

export default upload;
