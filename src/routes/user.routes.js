import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register")
    .post((req, res, next) => {
        console.log('Register route hit, body:', req.body); // Debug log
        next();
    }, registerUser);

export default router;