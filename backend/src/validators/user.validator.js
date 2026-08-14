import { body } from "express-validator";

export const updateUserValidator = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage("Name must contain at least 2 characters"),
];