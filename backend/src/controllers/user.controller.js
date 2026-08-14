import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { Meeting } from "../models/meeting.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/jwt.js";

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(httpStatus.BAD_REQUEST);
        throw new Error("Username and password are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        res.status(httpStatus.UNAUTHORIZED);
        throw new Error("Invalid username or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        res.status(httpStatus.UNAUTHORIZED);
        throw new Error("Invalid username or password");
    }

    const token = generateAccessToken({
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        role: user.role || 'USER',
    });

    user.token = token;
    await user.save({ validateBeforeSave: false });

    return res.status(httpStatus.OK).json({
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            role: user.role || 'USER',
        }
    });
});

const register = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;

    if ([name, username, password].some((field) => !field || field.trim() === "")) {
        res.status(httpStatus.BAD_REQUEST);
        throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(httpStatus.CONFLICT);
        throw new Error("User with this username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name: name.trim(),
        username: username.trim(),
        password: hashedPassword,
        role: 'USER',
    });

    return res.status(httpStatus.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            role: newUser.role,
        }
    });
});

const getUserHistory = asyncHandler(async (req, res) => {
    const token = req.query.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

    let userId = req.user?.username;

    if (!userId && token) {
        const user = await User.findOne({ token: token });
        if (user) {
            userId = user.username;
        }
    }

    if (!userId) {
        res.status(httpStatus.UNAUTHORIZED);
        throw new Error("Unauthorized access");
    }

    const meetings = await Meeting.find({ user_id: userId });
    res.status(httpStatus.OK).json(meetings);
});

const addToHistory = asyncHandler(async (req, res) => {
    const { token, meeting_code } = req.body;

    let userId = req.user?.username;

    if (!userId && token) {
        const user = await User.findOne({ token: token });
        if (user) {
            userId = user.username;
        }
    }

    if (!userId || !meeting_code) {
        res.status(httpStatus.BAD_REQUEST);
        throw new Error("Meeting code and authentication token are required");
    }

    const newMeeting = await Meeting.create({
        user_id: userId,
        meetingCode: meeting_code
    });

    res.status(httpStatus.CREATED).json({ message: "Added code to history", meeting: newMeeting });
});

export { login, register, getUserHistory, addToHistory };