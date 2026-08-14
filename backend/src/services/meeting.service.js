import {
    createMeeting,
    findMeetingByCode,
    findMeetingById,
    findMeetingsByUser,
    updateMeetingById,
    deleteMeetingById,
    addParticipant,
    removeParticipant,
    endMeetingById,
    findMeetingsByUserPaginated,
} from "../repositories/meeting.repository.js";

import { generateMeetingCode } from "../utils/generateMeetingCode.js";
import { hashPassword, comparePassword } from "../helpers/password.helper.js";
import { generateInviteToken, verifyInviteToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { INVITE_TOKEN_EXPIRY_HOURS } from "../constants/index.js";

export const createNewMeeting = async (hostId, meetingData = {}) => {
    let meetingCode;
    do {
        meetingCode = generateMeetingCode();
    } while (await findMeetingByCode(meetingCode));

    const data = { ...meetingData, host: hostId, meetingCode, participants: [hostId] };

    // Hash password if provided
    if (meetingData.password) {
        data.password = await hashPassword(meetingData.password);
        data.isPasswordProtected = true;
    }

    return await createMeeting(data);
};

export const getMeetingByCode = async (meetingCode) => {
    return await findMeetingByCode(meetingCode);
};

export const getMeetingById = async (meetingId) => {
    return await findMeetingById(meetingId);
};

export const getMeetingHistory = async (userId, options) => {
    const page = Math.max(1, parseInt(options.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(options.limit) || 10));
    const { search, status } = options;

    const { meetings, total } = await findMeetingsByUserPaginated(userId, { page, limit, search, status });

    // Compute duration for each meeting
    const data = meetings.map((m) => {
        const doc = m.toObject();
        if (doc.startedAt && doc.endedAt) {
            doc.duration = Math.round((new Date(doc.endedAt) - new Date(doc.startedAt)) / 1000); // seconds
        }
        return doc;
    });

    return {
        meetings: data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const joinMeeting = async (meetingCode, userId, password) => {
    const meeting = await findMeetingByCode(meetingCode);

    if (!meeting) throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    if (meeting.status === "ended") throw new ApiError(httpStatus.BAD_REQUEST, "Meeting has already ended");

    // Password check
    if (meeting.isPasswordProtected) {
        if (!password) throw new ApiError(httpStatus.UNAUTHORIZED, "Meeting password is required");
        const valid = await comparePassword(password, meeting.password);
        if (!valid) throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect meeting password");
    }

    return await addParticipant(meeting._id, userId);
};

export const leaveMeeting = async (meetingId, userId) => {
    return await removeParticipant(meetingId, userId);
};

export const endMeeting = async (meetingId, requesterId) => {
    const meeting = await findMeetingById(meetingId);

    if (!meeting) throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    if (meeting.status === "ended") throw new ApiError(httpStatus.BAD_REQUEST, "Meeting has already ended");
    if (meeting.host._id.toString() !== requesterId.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, "Only the host can end this meeting");
    }

    return await endMeetingById(meetingId);
};

export const deleteMeetingService = async (meetingId) => {
    return await deleteMeetingById(meetingId);
};

// ─── Phase 3.10: Invite ──────────────────────────────────────────────────────

export const generateInviteLink = async (meetingId, hostId) => {
    const meeting = await findMeetingById(meetingId);

    if (!meeting) throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    if (meeting.host._id.toString() !== hostId.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, "Only the host can generate invite links");
    }

    const token = generateInviteToken(
        { meetingId, meetingCode: meeting.meetingCode },
        `${INVITE_TOKEN_EXPIRY_HOURS}h`
    );

    return { token, meetingCode: meeting.meetingCode, expiresInHours: INVITE_TOKEN_EXPIRY_HOURS };
};

export const joinByInviteToken = async (token, userId) => {
    const payload = verifyInviteToken(token);
    if (!payload) throw new ApiError(httpStatus.BAD_REQUEST, "Invalid or expired invite link");

    return await joinMeeting(payload.meetingCode, userId);
};

// ─── Phase 3.11: Password ────────────────────────────────────────────────────

export const updateMeetingPassword = async (meetingId, hostId, password) => {
    const meeting = await findMeetingById(meetingId);

    if (!meeting) throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    if (meeting.host._id.toString() !== hostId.toString()) {
        throw new ApiError(httpStatus.FORBIDDEN, "Only the host can update the password");
    }

    const hashed = password ? await hashPassword(password) : "";
    return await updateMeetingById(meetingId, {
        password: hashed,
        isPasswordProtected: !!password,
    });
};
