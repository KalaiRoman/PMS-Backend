import express from "express";
import router from "../routes/Routes.js";
import DataBaseConnection from "../utils/DataBaseConnect.js";
import envFile from "../utils/EnvConfig.js";
import morgan from "morgan";
import cors from "cors";
envFile;
const app = express();
app.use(express.json());
const Port = process.env.PORT;
const allowedOrigins = process.env.CORS_ORIGINS_URLS
  .split(",")
  .map(origin => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS Error: ${origin} is not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.get("/", (req, res, next) => {
  return res
    .status(200)
    .json({ status: true, message: "Backend Working fine" });
});
app.use(morgan("dev"));
app.use("/api/v1", router);
app.listen(8008, () => {
  DataBaseConnection;
  console.log(`Backend Running working fine port ${Port}`);
});
