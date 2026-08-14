import { body, query } from "express-validator";

export const joinMeetingValidator = [
    body("meetingCode")
        .notEmpty().withMessage("Meeting code is required")
        .isLength({ min: 6, max: 20 }).withMessage("Invalid meeting code"),
    body("password")
        .optional()
        .isString().withMessage("Password must be a string"),
];

export const historyValidator = [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be between 1 and 50"),
    query("status").optional().isIn(["scheduled", "live", "ended"]).withMessage("Invalid status"),
    query("search").optional().isString(),
];

export const updatePasswordValidator = [
    body("password")
        .optional({ nullable: true })
        .isLength({ min: 4 }).withMessage("Password must be at least 4 characters"),
];

export const createMeetingValidator = [
    body("title").optional().isString().isLength({ max: 100 }).withMessage("Title too long"),
    body("password")
        .optional()
        .isLength({ min: 4 }).withMessage("Password must be at least 4 characters"),
    body("waitingRoom").optional().isBoolean(),
];
