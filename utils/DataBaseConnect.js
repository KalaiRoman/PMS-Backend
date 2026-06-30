import mongoose from "mongoose";
import envFile from "./EnvConfig.js";
envFile;
const DataBaseConnection = mongoose
  .connect(process.env.MONGO_URL)
  .then(res => {
    console.log("Data Base Connected Successfully");
  })
  .catch(error => {
    console.log("Data Base Conection Error");
  });

export default DataBaseConnection;
