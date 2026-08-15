import { Router } from "express";
import { addToHistory, getUserHistory, login, register, getCurrentUser, getContacts } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/me").get(authMiddleware, getCurrentUser);
router.route("/contacts").get(authMiddleware, getContacts);
router.route("/add_to_activity").post(authMiddleware, addToHistory);
router.route("/get_all_activity").get(authMiddleware, getUserHistory);

export default router;