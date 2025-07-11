import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {
    // Debug log
    console.log('Request body in controller:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, "Request body is empty");
    }

    const { userName, email, password } = req.body;
    
    if (!userName || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    if ([userName, email, password].some(field => field.trim() === "")) {
        throw new ApiError(400, "Fields cannot be empty");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { userName: userName.toLowerCase() }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponce (201, createdUser, "User registered successfully")
        
    );
});

export { registerUser };