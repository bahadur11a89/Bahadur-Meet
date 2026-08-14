import { Router } from "express";

import {
    createMeeting,
    getHistory,
    getMeeting,
    joinMeetingController,
    leaveMeetingController,
    endMeetingController,
    generateInviteLinkController,
    joinByInviteController,
    updatePasswordController,
} from "../controllers/meeting.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

import {
    createMeetingValidator,
    joinMeetingValidator,
    historyValidator,
    updatePasswordValidator,
} from "../validators/meeting.validator.js";

const router = Router();

// ─── Phase 3.1 ───────────────────────────────────────────────────────────────
router.post("/create", authMiddleware, createMeetingValidator, validate, createMeeting);

// ─── Phase 3.2 ───────────────────────────────────────────────────────────────
router.post("/join", authMiddleware, joinMeetingValidator, validate, joinMeetingController);

// ─── Phase 3.9 ───────────────────────────────────────────────────────────────
router.get("/history", authMiddleware, historyValidator, validate, getHistory);

// ─── Phase 3.10 ──────────────────────────────────────────────────────────────
router.post("/invite/:meetingId", authMiddleware, generateInviteLinkController);
router.post("/invite/join/:token", authMiddleware, joinByInviteController);

// ─── Phase 3.11 ──────────────────────────────────────────────────────────────
router.put("/password/:meetingId", authMiddleware, updatePasswordValidator, validate, updatePasswordController);

// ─── Parameterized (keep below static routes) ────────────────────────────────
router.get("/:meetingCode", authMiddleware, getMeeting);
router.delete("/leave/:meetingId", authMiddleware, leaveMeetingController);

// ─── Phase 3.8 ───────────────────────────────────────────────────────────────
router.put("/end/:meetingId", authMiddleware, endMeetingController);

export default router;
