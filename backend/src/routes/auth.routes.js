import { Router } from "express";

import { login, register } from "../controllers/user.controller.js";
import { logout, changePassword } from "../controllers/auth.controller.js";

import {
    loginValidator,
    registerValidator
} from "../validators/auth.validator.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { sensitiveAuthLimiter } from "../middlewares/rateLimiter.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = Router();

// Register
router.post(
    "/register",
    sensitiveAuthLimiter,
    registerValidator,
    validate,
    register
);

// Login
router.post(
    "/login",
    sensitiveAuthLimiter,
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
    sensitiveAuthLimiter,
    authMiddleware,
    changePassword
);

export default router;