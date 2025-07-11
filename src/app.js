import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./dbConnect.js";
import serverless from "serverless-http";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Database connection
app.use(async (req, res, next) => {
  await dbConnect();
  next();
});

// Your routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is working 🎉");
});

// ✅ EXPORT for vercel
export default serverless(app);
