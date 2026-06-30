import express from "express";
import router from "../routes/Routes.js";
import DataBaseConnection from "../utils/DataBaseConnect.js";
import envFile from "../utils/EnvConfig.js";
envFile;
const app = express();
app.use(express.json());
const Port = process.env.PORT;
app.get("/", (req, res, next) => {
  return res
    .status(200)
    .json({ status: true, message: "Backend Working fine" });
});
app.use("/api/v1", router);
app.listen(8008, () => {
  DataBaseConnection;
  console.log(`Backend Running working fine port ${Port}`);
});
