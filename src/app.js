import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import serverless from "serverless-http"; // ✅ REQUIRED for Vercel

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Your routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is running fine on Vercel!");
});

// ✅ IMPORTANT: DO NOT use app.listen() on Vercel
export const handler = serverless(app);
