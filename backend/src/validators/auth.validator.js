import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("username")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];