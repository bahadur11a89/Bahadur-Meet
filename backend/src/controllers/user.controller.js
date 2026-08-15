import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { Meeting } from "../models/meeting.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/jwt.js";
import { generateUniquePMI } from "../utils/pmi.js";

const getCurrentUser = asyncHandler(async (req, res) => {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
        res.status(httpStatus.UNAUTHORIZED);
        throw new Error("Unauthorized access");
    }

    let user = await User.findById(userId).select("-password -token -refreshToken");
    if (!user) {
        res.status(httpStatus.NOT_FOUND);
        throw new Error("User not found");
    }

    if (!user.personalMeetingId) {
        user.personalMeetingId = await generateUniquePMI();
        await user.save({ validateBeforeSave: false });
    }

    return res.status(httpStatus.OK).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            role: user.role || 'USER',
            personalMeetingId: user.personalMeetingId,
            avatar: user.avatar || '',
            presence: user.presence || { status: 'online' },
        }
    });
});

const getContacts = asyncHandler(async (req, res) => {
    const userId = req.user?.id || req.user?._id;
    const { search } = req.query;

    const query = { _id: { $ne: userId } };
    if (search && search.trim()) {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [{ name: searchRegex }, { username: searchRegex }];
    }

    const users = await User.find(query)
        .select("_id name username avatar role presence")
        .sort({ name: 1 })
        .limit(50);

    const contacts = users.map(u => ({
        id: u._id,
        name: u.name,
        username: u.username,
        role: u.role || 'User',
        status: u.presence?.status || 'online',
        avatar: u.avatar || '',
    }));

    return res.status(httpStatus.OK).json({
        success: true,
        data: contacts,
        contacts,
    });
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(httpStatus.BAD_REQUEST);
        throw new Error("Username and password are required");
    }

    const cleanUsername = username.trim().toLowerCase();
    const user = await User.findOne({
        $or: [{ username: cleanUsername }, { username: username.trim() }]
    });

    if (!user) {
        res.status(httpStatus.UNAUTHORIZED);
        throw new Error("Invalid username or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        res.status(httpStatus.UNAUTHORIZED);
        throw new Error("Invalid username or password");
    }

    if (!user.personalMeetingId) {
        user.personalMeetingId = await generateUniquePMI();
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
            personalMeetingId: user.personalMeetingId,
        }
    });
});

const register = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body;

    if ([name, username, password].some((field) => !field || field.trim() === "")) {
        res.status(httpStatus.BAD_REQUEST);
        throw new Error("All fields are required");
    }

    const cleanUsername = username.trim().toLowerCase();
    const existingUser = await User.findOne({
        $or: [{ username: cleanUsername }, { username: username.trim() }]
    });
    if (existingUser) {
        res.status(httpStatus.CONFLICT);
        throw new Error("User with this username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const pmi = await generateUniquePMI();

    const newUser = await User.create({
        name: name.trim(),
        username: username.trim(),
        password: hashedPassword,
        role: 'USER',
        personalMeetingId: pmi,
    });

    return res.status(httpStatus.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            role: newUser.role,
            personalMeetingId: newUser.personalMeetingId,
        }
    });
});

const getUserHistory = asyncHandler(async (req, res) => {
    const token = req.query.token || (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

    let userObj = null;

    if (req.user?.id) {
        userObj = await User.findById(req.user.id);
    }

    if (!userObj && token) {
        userObj = await User.findOne({ token: token });
    }

    if (!userObj) {
        res.status(httpStatus.UNAUTHORIZED);
        throw new Error("Unauthorized access");
    }

    const meetings = await Meeting.find({
        $or: [{ host: userObj._id }, { participants: userObj._id }]
    }).sort({ createdAt: -1 });

    res.status(httpStatus.OK).json(meetings);
});

const addToHistory = asyncHandler(async (req, res) => {
    const { token, meeting_code } = req.body;

    let userObj = null;

    if (req.user?.id) {
        userObj = await User.findById(req.user.id);
    }

    if (!userObj && token) {
        userObj = await User.findOne({ token: token });
    }

    if (!userObj || !meeting_code) {
        res.status(httpStatus.BAD_REQUEST);
        throw new Error("Meeting code and authentication token are required");
    }

    let meeting = await Meeting.findOne({ meetingCode: meeting_code });

    if (meeting) {
        meeting = await Meeting.findByIdAndUpdate(
            meeting._id,
            { $addToSet: { participants: userObj._id } },
            { new: true }
        );
    } else {
        meeting = await Meeting.create({
            host: userObj._id,
            meetingCode: meeting_code,
            participants: [userObj._id]
        });
    }

    res.status(httpStatus.CREATED).json({ message: "Added code to history", meeting });
});

export { login, register, getUserHistory, addToHistory, getCurrentUser, getContacts };