import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

export const logout = asyncHandler(async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

});

export const changePassword = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const { currentPassword, oldPassword, newPassword, password } = req.body;
    const targetPassword = newPassword || password;

    if (!targetPassword) {
        res.status(httpStatus.BAD_REQUEST);
        throw new Error("New password is required");
    }

    const user = await User.findById(userId);
    if (!user) {
        res.status(httpStatus.NOT_FOUND);
        throw new Error("User not found");
    }

    const checkOldPassword = currentPassword || oldPassword;
    if (checkOldPassword) {
        const isMatch = await bcrypt.compare(checkOldPassword, user.password);
        if (!isMatch) {
            res.status(httpStatus.BAD_REQUEST);
            throw new Error("Incorrect current password");
        }
    }

    const hashedPassword = await bcrypt.hash(targetPassword, 10);
    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(httpStatus.OK).json({
        success: true,
        message: "Password changed successfully"
    });
});