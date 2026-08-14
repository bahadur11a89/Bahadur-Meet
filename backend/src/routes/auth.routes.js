import { Router } from "express";

import { login, register } from "../controllers/user.controller.js";
import { logout } from "../controllers/auth.controller.js";

import {
    loginValidator,
    registerValidator
} from "../validators/auth.validator.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validation.middleware.js";

const router = Router();

// Register
router.post(
    "/register",
    registerValidator,
    validate,
    register
);

// Login
router.post(
    "/login",
    loginValidator,
    validate,
    login
);

// Logout
router.post(
    "/logout",
    authMiddleware,
    logout
);

// Change Password
router.put(
    "/change-password",
    authMiddleware,
    logout
);

export default router;