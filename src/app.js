import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Enhanced CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));

// Body parsing middleware with better error handling
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

// Request logger middleware
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    console.log('Request headers:', req.headers);
    if (req.body) console.log('Request body:', req.body);
    next();
});

// Routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);  // Changed to plural "users" for REST convention

app.post('/api/v1/users/register', async (req, res) => {
  try {
    // do your create user logic here
    // e.g. await User.create(...);

    res.redirect("/"); // after successful registration
  } catch (err) {
    res.status(400).send(`
      <h2>Registration failed: ${err.message}</h2>
      <p><a href="/">Try again</a></p>
    `);
  }
});

export { app };