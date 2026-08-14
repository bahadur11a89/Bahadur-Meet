import {
    findMeetingById,
    addParticipant,
    removeParticipant,
    endMeetingById,
    updateMeetingStatus,
    updateMeetingById,
} from "../repositories/meeting.repository.js";

import roomRegistry from "../socket/room.registry.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { ROOM_STATUS, MAX_PARTICIPANTS_DEFAULT } from "../constants/index.js";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Asserts the caller is the host of the meeting.
 * Throws 403 if not.
 */
const assertHost = (room, userId) => {
    if (!room || room.hostId !== userId) {
        throw new ApiError(httpStatus.FORBIDDEN, "Only the host can perform this action");
    }
};

// ── Room Lifecycle ────────────────────────────────────────────────────────────

/**
 * Creates a room in the registry and marks the meeting as live in MongoDB.
 * The meeting document must already exist (created via REST API).
 *
 * @param {string} meetingId   - MongoDB _id of the meeting
 * @param {string} hostId      - userId of the creator
 * @param {string} hostSocketId
 * @param {number} [maxParticipants]
 * @returns {{ room: Object, meeting: Object }}
 */
export const createRoom = async (meetingId, hostId, hostSocketId, maxParticipants = MAX_PARTICIPANTS_DEFAULT) => {
    const meeting = await findMeetingById(meetingId);

    if (!meeting) {
        throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    }

    if (meeting.status === "ended") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Meeting has already ended");
    }

    // Idempotent — safe to call even if room already exists
    const room = roomRegistry.createRoom(meetingId, hostId, maxParticipants);

    // Add host as first participant
    roomRegistry.addParticipant(meetingId, hostId, hostSocketId);

    // Persist host as participant in MongoDB
    await addParticipant(meetingId, hostId);

    // Ensure meeting is marked live
    if (meeting.status !== "live") {
        await updateMeetingStatus(meetingId, "live");
    }

    return { room: roomRegistry.getRoomSnapshot(meetingId), meeting };
};

// ── Join ──────────────────────────────────────────────────────────────────────

/**
 * Joins an existing room.
 * Validates: meeting exists, not ended, not locked, not at capacity, no duplicate.
 *
 * @returns {{ room: Object, participants: Array }}
 */
export const joinRoom = async (meetingId, userId, socketId) => {
    const meeting = await findMeetingById(meetingId);

    if (!meeting) {
        throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    }

    if (meeting.status === "ended") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Meeting has already ended");
    }

    // Check registry lock (real-time state)
    if (roomRegistry.isRoomLocked(meetingId)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Room is locked — no new participants allowed");
    }

    // Duplicate join guard
    if (roomRegistry.isInRoom(meetingId, userId)) {
        throw new ApiError(httpStatus.CONFLICT, "Already in this room");
    }

    // Capacity check
    const count = roomRegistry.getParticipantCount(meetingId);
    const room = roomRegistry.getRoom(meetingId);
    if (room && count >= room.maxParticipants) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Room is at maximum capacity");
    }

    // Create room entry if host joined via REST but not yet via socket
    if (!room) {
        const hostId = meeting.host._id.toString();
        roomRegistry.createRoom(meetingId, hostId);
    }

    roomRegistry.addParticipant(meetingId, userId, socketId);
    await addParticipant(meetingId, userId);

    const participants = roomRegistry.getParticipants(meetingId);
    const snapshot = roomRegistry.getRoomSnapshot(meetingId);

    return { room: snapshot, participants };
};

// ── Leave ─────────────────────────────────────────────────────────────────────

/**
 * Removes a participant from the room.
 * If the leaving user is the host, transfers host to next participant.
 * If the room becomes empty, cleans up registry.
 *
 * @returns {{ newHostId: string|null, roomDeleted: boolean }}
 */
export const leaveRoom = async (meetingId, userId) => {
    const room = roomRegistry.getRoom(meetingId);
    const wasHost = room?.hostId === userId;

    roomRegistry.removeParticipant(meetingId, userId);
    await removeParticipant(meetingId, userId);

    const remainingRoom = roomRegistry.getRoom(meetingId);

    // Room was deleted (last participant left)
    if (!remainingRoom) {
        return { newHostId: null, roomDeleted: true };
    }

    // Transfer host if the host left
    let newHostId = null;
    if (wasHost) {
        newHostId = roomRegistry.transferHost(meetingId);
    }

    return { newHostId, roomDeleted: false };
};

// ── Remove Participant (host action) ──────────────────────────────────────────

/**
 * Host forcibly removes a participant.
 * Returns the removed participant's socketId so the handler can disconnect them.
 *
 * @param {string} meetingId
 * @param {string} requesterId  - must be host
 * @param {string} targetUserId
 * @returns {string} targetSocketId
 */
export const removeParticipantFromRoom = async (meetingId, requesterId, targetUserId) => {
    const room = roomRegistry.getRoom(meetingId);

    assertHost(room, requesterId);

    if (!room.participants.has(targetUserId)) {
        throw new ApiError(httpStatus.NOT_FOUND, "Participant not found in room");
    }

    const targetSocketId = room.participants.get(targetUserId);

    roomRegistry.removeParticipant(meetingId, targetUserId);
    await removeParticipant(meetingId, targetUserId);

    return targetSocketId;
};

// ── Lock / Unlock ─────────────────────────────────────────────────────────────

/**
 * Locks the room — only host allowed.
 * Also persists isLocked to MongoDB.
 */
export const lockRoom = async (meetingId, requesterId) => {
    const room = roomRegistry.getRoom(meetingId);
    assertHost(room, requesterId);

    roomRegistry.lockRoom(meetingId);
    await updateMeetingById(meetingId, { isLocked: true });
};

/**
 * Unlocks the room — only host allowed.
 */
export const unlockRoom = async (meetingId, requesterId) => {
    const room = roomRegistry.getRoom(meetingId);
    assertHost(room, requesterId);

    roomRegistry.unlockRoom(meetingId);
    await updateMeetingById(meetingId, { isLocked: false });
};

// ── End Meeting ───────────────────────────────────────────────────────────────

/**
 * Host ends the meeting.
 * - Marks registry as ended
 * - Persists ended status + endedAt to MongoDB
 * - Returns all participant socketIds so the handler can notify/disconnect them
 *
 * @returns {{ participantSocketIds: string[] }}
 */
export const endMeeting = async (meetingId, requesterId) => {
    const room = roomRegistry.getRoom(meetingId);
    assertHost(room, requesterId);

    // Collect all socketIds before clearing
    const participantSocketIds = roomRegistry
        .getParticipants(meetingId)
        .map((p) => p.socketId);

    // Mark registry ended then remove
    roomRegistry.endRoom(meetingId);
    roomRegistry.removeRoom(meetingId);

    // Persist to MongoDB
    await endMeetingById(meetingId);

    return { participantSocketIds };
};

// ── Disconnect Recovery ───────────────────────────────────────────────────────

/**
 * Called when a socket disconnects unexpectedly.
 * Finds the room by socketId, removes the participant, handles host transfer.
 *
 * @param {string} socketId
 * @returns {{ meetingId, userId, newHostId, roomDeleted } | null}
 */
export const handleSocketDisconnect = async (socketId) => {
    const found = roomRegistry.findParticipantBySocketId(socketId);
    if (!found) return null;

    const { meetingId, userId } = found;
    const { newHostId, roomDeleted } = await leaveRoom(meetingId, userId);

    return { meetingId, userId, newHostId, roomDeleted };
};
