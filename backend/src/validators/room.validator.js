import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

/**
 * Validates that a value is a non-empty string.
 * @param {*} value
 * @param {string} fieldName
 */
const requireString = (value, fieldName) => {
    if (!value || typeof value !== "string" || !value.trim()) {
        throw new ApiError(httpStatus.BAD_REQUEST, `${fieldName} is required and must be a non-empty string`);
    }
};

// ── room:create ───────────────────────────────────────────────────────────────

/**
 * Validates payload for room:create event.
 * @param {{ meetingId: string, title?: string, maxParticipants?: number }} payload
 */
export const validateRoomCreate = ({ meetingId, maxParticipants } = {}) => {
    requireString(meetingId, "meetingId");

    if (maxParticipants !== undefined) {
        if (typeof maxParticipants !== "number" || maxParticipants < 2 || maxParticipants > 500) {
            throw new ApiError(httpStatus.BAD_REQUEST, "maxParticipants must be a number between 2 and 500");
        }
    }
};

// ── room:join ─────────────────────────────────────────────────────────────────

/**
 * Validates payload for room:join event.
 * @param {{ meetingId: string }} payload
 */
export const validateRoomJoin = ({ meetingId } = {}) => {
    requireString(meetingId, "meetingId");
};

// ── room:leave ────────────────────────────────────────────────────────────────

/**
 * Validates payload for room:leave event.
 * @param {{ meetingId: string }} payload
 */
export const validateRoomLeave = ({ meetingId } = {}) => {
    requireString(meetingId, "meetingId");
};

// ── room:lock / room:unlock ───────────────────────────────────────────────────

/**
 * Validates payload for room:lock and room:unlock events.
 * @param {{ meetingId: string }} payload
 */
export const validateRoomLock = ({ meetingId } = {}) => {
    requireString(meetingId, "meetingId");
};

// ── room:remove-user ──────────────────────────────────────────────────────────

/**
 * Validates payload for room:remove-user event.
 * @param {{ meetingId: string, targetUserId: string }} payload
 */
export const validateRoomRemoveUser = ({ meetingId, targetUserId } = {}) => {
    requireString(meetingId, "meetingId");
    requireString(targetUserId, "targetUserId");
};

// ── room:end-meeting ──────────────────────────────────────────────────────────

/**
 * Validates payload for room:end-meeting event.
 * @param {{ meetingId: string }} payload
 */
export const validateRoomEnd = ({ meetingId } = {}) => {
    requireString(meetingId, "meetingId");
};
