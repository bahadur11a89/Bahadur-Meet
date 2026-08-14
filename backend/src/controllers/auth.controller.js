import asyncHandler from "../utils/asyncHandler.js";

export const logout = asyncHandler(async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

});