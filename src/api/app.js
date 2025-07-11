import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./dbConnect.js";
import serverless from "serverless-http";

// handle unexpected errors
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// connect to Mongo
app.use((req, res, next) => {
  dbConnect().then(() => next()).catch(next);
});

// your routes
import userRoutes from "../routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is working 🎉");
});

export default serverless(app);
