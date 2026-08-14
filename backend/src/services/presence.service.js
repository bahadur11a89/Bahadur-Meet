import presenceRegistry from "../registry/presence.registry.js";
import {
    updateLastSeen,
    updatePresenceStatus,
    findUserById,
} from "../repositories/user.repository.js";
import { findMeetingById } from "../repositories/meeting.repository.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { PRESENCE_STATUS } from "../constants/index.js";

// ── setOnline ─────────────────────────────────────────────────────────────────

/**
 * Called when a socket connects and emits presence:online.
 * - Registers socket in registry
 * - Sets status ONLINE
 * - Persists lastSeen to MongoDB
 *
 * @param {string} userId
 * @param {string} socketId
 * @param {string} [device]
 * @returns {Object} presence snapshot
 */
export const setOnline = async (userId, socketId, device) => {
    const entry = presenceRegistry.addUserPresence(userId, socketId, device);

    // Persist to DB (non-blocking — fire and forget pattern acceptable here,
    // but we await to surface DB errors via socketErrorHandler)
    await updatePresenceStatus(userId, PRESENCE_STATUS.ONLINE, null);

    return presenceRegistry.getSnapshot(entry);
};

// ── joinMeeting ───────────────────────────────────────────────────────────────

/**
 * Changes status ONLINE → IN_MEETING and attaches meetingId.
 * Validates the meeting exists and is live.
 *
 * @param {string} userId
 * @param {string} meetingId
 * @returns {Object} presence snapshot
 */
export const joinMeeting = async (userId, meetingId) => {
    const meeting = await findMeetingById(meetingId);

    if (!meeting) {
        throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    }

    if (meeting.status === "ended") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Meeting has already ended");
    }

    presenceRegistry.updateStatus(userId, PRESENCE_STATUS.IN_MEETING, meetingId);
    await updatePresenceStatus(userId, PRESENCE_STATUS.IN_MEETING, meetingId);

    return presenceRegistry.getSnapshot(userId);
};

// ── leaveMeeting ──────────────────────────────────────────────────────────────

/**
 * Changes status IN_MEETING → ONLINE and clears meetingId.
 *
 * @param {string} userId
 * @returns {Object} presence snapshot
 */
export const leaveMeeting = async (userId) => {
    presenceRegistry.updateStatus(userId, PRESENCE_STATUS.ONLINE, null);
    await updatePresenceStatus(userId, PRESENCE_STATUS.ONLINE, null);

    return presenceRegistry.getSnapshot(userId);
};

// ── updateStatus ──────────────────────────────────────────────────────────────

/**
 * Generic status update — user can set ONLINE or AWAY.
 * Users cannot set their own status to OFFLINE or IN_MEETING directly
 * (those are controlled by system events).
 *
 * @param {string} userId
 * @param {string} requesterId  - must equal userId (own presence only)
 * @param {string} status
 * @returns {Object} presence snapshot
 */
export const updateStatus = async (userId, requesterId, status) => {
    if (userId !== requesterId) {
        throw new ApiError(httpStatus.FORBIDDEN, "Cannot modify another user's presence");
    }

    const allowed = [PRESENCE_STATUS.ONLINE, PRESENCE_STATUS.AWAY];
    if (!allowed.includes(status)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `Status must be one of: ${allowed.join(", ")}`
        );
    }

    presenceRegistry.updateStatus(userId, status);
    await updatePresenceStatus(userId, status);

    return presenceRegistry.getSnapshot(userId);
};

// ── heartbeat ─────────────────────────────────────────────────────────────────

/**
 * Refreshes lastSeen for a user.
 * Validates the timestamp is recent (within 60s) to prevent fake heartbeats.
 *
 * @param {string} userId
 * @param {number} timestamp  - client-provided Unix ms timestamp
 * @returns {Date} updated lastSeen
 */
export const heartbeat = async (userId, timestamp) => {
    const now = Date.now();
    const drift = Math.abs(now - timestamp);

    // Reject heartbeats with > 60s clock drift (fake or stale)
    if (drift > 60_000) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Heartbeat timestamp is too far from server time");
    }

    presenceRegistry.updateLastSeen(userId);
    await updateLastSeen(userId);

    return presenceRegistry.getUserPresence(userId)?.lastSeen ?? new Date();
};

// ── getPresence ───────────────────────────────────────────────────────────────

/**
 * Returns presence snapshot for a userId.
 * Falls back to DB if user is not in registry (offline user).
 *
 * @param {string} targetUserId
 * @returns {{ userId, status, lastSeen, meetingId }}
 */
export const getPresence = async (targetUserId) => {
    const live = presenceRegistry.getSnapshot(targetUserId);
    if (live) return live;

    // User is offline — fetch lastSeen from DB
    const user = await findUserById(targetUserId);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    return {
        userId: targetUserId,
        status: PRESENCE_STATUS.OFFLINE,
        lastSeen: user.presence?.lastSeen ?? null,
        meetingId: null,
    };
};

// ── setOffline ────────────────────────────────────────────────────────────────

/**
 * Called on socket disconnect.
 * Removes the socket from registry.
 * Only marks OFFLINE + persists when ALL sockets for the user are gone.
 *
 * @param {string} socketId
 * @returns {{ userId, isFullyOffline, lastSeen } | null}
 */
export const setOffline = async (socketId) => {
    const result = presenceRegistry.removeSocket(socketId);
    if (!result) return null;

    const { userId, isFullyOffline, lastSeen } = result;

    if (isFullyOffline) {
        await updatePresenceStatus(userId, PRESENCE_STATUS.OFFLINE, null);
    } else {
        // Still has other sockets — just refresh lastSeen
        await updateLastSeen(userId);
    }

    return { userId, isFullyOffline, lastSeen };
};

// ── getOnlineUsers ────────────────────────────────────────────────────────────

/**
 * Returns all currently online users (from registry only — no DB call).
 */
export const getOnlineUsers = () => {
    return presenceRegistry.getOnlineUsers();
};

// ── getMeetingParticipantsPresence ────────────────────────────────────────────

/**
 * Returns presence snapshots for all users currently in a specific meeting.
 * @param {string} meetingId
 */
export const getMeetingParticipantsPresence = (meetingId) => {
    return presenceRegistry.getMeetingParticipants(meetingId);
};
