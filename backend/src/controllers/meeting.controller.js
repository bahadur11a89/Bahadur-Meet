import httpStatus from "http-status";
import asyncHandler from "../utils/asyncHandler.js";
import { getIo } from "../socket/index.js";
import { SOCKET_EVENTS } from "../constants/index.js";

import {
    createNewMeeting,
    getMeetingByCode,
    getMeetingById,
    getMeetingHistory,
    joinMeeting,
    leaveMeeting,
    endMeeting,
    generateInviteLink,
    joinByInviteToken,
    updateMeetingPassword,
} from "../services/meeting.service.js";

// ─── Phase 3.1 ───────────────────────────────────────────────────────────────

export const createMeeting = asyncHandler(async (req, res) => {
    const meeting = await createNewMeeting(req.user.id, req.body);
    return res.status(httpStatus.CREATED).json({ success: true, message: "Meeting created successfully", data: meeting });
});

// ─── Phase 3.9 ───────────────────────────────────────────────────────────────

export const getHistory = asyncHandler(async (req, res) => {
    const result = await getMeetingHistory(req.user.id, req.query);
    return res.status(httpStatus.OK).json({ success: true, data: result });
});

// ─── Existing ────────────────────────────────────────────────────────────────

export const getMeeting = asyncHandler(async (req, res) => {
    const meeting = await getMeetingByCode(req.params.meetingCode);
    return res.status(httpStatus.OK).json({ success: true, data: meeting });
});

export const joinMeetingController = asyncHandler(async (req, res) => {
    const { meetingCode, password } = req.body;
    const meeting = await joinMeeting(meetingCode, req.user.id, password);
    return res.status(httpStatus.OK).json({ success: true, message: "Joined meeting successfully", data: meeting });
});

export const leaveMeetingController = asyncHandler(async (req, res) => {
    const meeting = await leaveMeeting(req.params.meetingId, req.user.id);
    return res.status(httpStatus.OK).json({ success: true, message: "Left meeting successfully", data: meeting });
});

// ─── Phase 3.8 ───────────────────────────────────────────────────────────────

export const endMeetingController = asyncHandler(async (req, res) => {
    const meeting = await endMeeting(req.params.meetingId, req.user.id);

    // Notify all participants in the room via Socket.IO
    getIo().to(req.params.meetingId).emit(SOCKET_EVENTS.MEETING_ENDED, {
        meetingId: req.params.meetingId,
        endedAt: meeting.endedAt,
    });

    return res.status(httpStatus.OK).json({ success: true, message: "Meeting ended successfully", data: meeting });
});

// ─── Phase 3.10 ──────────────────────────────────────────────────────────────

export const generateInviteLinkController = asyncHandler(async (req, res) => {
    const result = await generateInviteLink(req.params.meetingId, req.user.id);
    return res.status(httpStatus.OK).json({ success: true, data: result });
});

export const joinByInviteController = asyncHandler(async (req, res) => {
    const meeting = await joinByInviteToken(req.params.token, req.user.id);
    return res.status(httpStatus.OK).json({ success: true, message: "Joined meeting via invite", data: meeting });
});

// ─── Phase 3.11 ──────────────────────────────────────────────────────────────

export const updatePasswordController = asyncHandler(async (req, res) => {
    const meeting = await updateMeetingPassword(req.params.meetingId, req.user.id, req.body.password);
    return res.status(httpStatus.OK).json({ success: true, message: "Meeting password updated", data: meeting });
});
