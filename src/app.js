import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import serverless from "serverless-http";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));

app.use(express.json({
    limit: "16kb",
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf.toString());
        } catch (e) {
            throw new Error('Invalid JSON');
        }
    }
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    console.log('Request headers:', req.headers);
    if (req.body) console.log('Request body:', req.body);
    next();
});

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

app.post('/api/v1/users/register', async (req, res) => {
  try {
    // await User.create(...)
    res.redirect("/");
  } catch (err) {
    res.status(400).send(`
      <h2>Registration failed: ${err.message}</h2>
      <p><a href="/">Try again</a></p>
    `);
  }
});

// 👇 this is key for Vercel
export const handler = serverless(app);
