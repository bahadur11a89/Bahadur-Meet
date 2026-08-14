import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { PRESENCE_STATUS } from "../constants/index.js";

/**
 * presence:online
 * Payload: { device? }
 */
export const validatePresenceOnline = (payload = {}) => {
    const { device } = payload;
    if (device !== undefined && typeof device !== "string") {
        throw new ApiError(httpStatus.BAD_REQUEST, "device must be a string");
    }
};

/**
 * presence:update
 * Payload: { status, meetingId? }
 */
export const validatePresenceUpdate = ({ status, meetingId } = {}) => {
    const allowed = [PRESENCE_STATUS.ONLINE, PRESENCE_STATUS.AWAY];

    if (!status || !allowed.includes(status)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `status must be one of: ${allowed.join(", ")}`
        );
    }

    if (meetingId !== undefined && (typeof meetingId !== "string" || !meetingId.trim())) {
        throw new ApiError(httpStatus.BAD_REQUEST, "meetingId must be a non-empty string");
    }
};

/**
 * presence:get
 * Payload: { userId }
 */
export const validatePresenceGet = ({ userId } = {}) => {
    if (!userId || typeof userId !== "string" || !userId.trim()) {
        throw new ApiError(httpStatus.BAD_REQUEST, "userId is required");
    }
};

/**
 * presence:heartbeat
 * Payload: { timestamp }
 */
export const validateHeartbeat = ({ timestamp } = {}) => {
    if (typeof timestamp !== "number" || timestamp <= 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "timestamp must be a positive number (Unix ms)");
    }
};

/**
 * presence:join-meeting
 * Payload: { meetingId }
 */
export const validateJoinMeeting = ({ meetingId } = {}) => {
    if (!meetingId || typeof meetingId !== "string" || !meetingId.trim()) {
        throw new ApiError(httpStatus.BAD_REQUEST, "meetingId is required");
    }
};
