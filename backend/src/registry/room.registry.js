import { ROOM_STATUS, MAX_PARTICIPANTS_DEFAULT } from "../constants/index.js";

/**
 * In-memory Room Registry — Phase 4.3 upgrade.
 *
 * Room shape:
 * {
 *   meetingId:       string,
 *   hostId:          string,
 *   participants:    Map<userId, socketId>,
 *   status:          "active" | "ended",
 *   locked:          boolean,
 *   maxParticipants: number,
 *   createdAt:       Date,
 * }
 *
 * Singleton — import roomRegistry directly.
 */
class RoomRegistry {
    constructor() {
        /** @type {Map<string, Object>} */
        this._rooms = new Map();
    }

    // ── Room Lifecycle ────────────────────────────────────────────────────────

    /**
     * Creates a new room. Idempotent — returns existing room if already present.
     * @param {string} meetingId
     * @param {string} hostId
     * @param {number} [maxParticipants]
     */
    createRoom(meetingId, hostId, maxParticipants = MAX_PARTICIPANTS_DEFAULT) {
        if (!this._rooms.has(meetingId)) {
            this._rooms.set(meetingId, {
                meetingId,
                hostId,
                participants: new Map(), // userId → socketId
                status: ROOM_STATUS.ACTIVE,
                locked: false,
                maxParticipants,
                createdAt: new Date(),
            });
        }
        return this._rooms.get(meetingId);
    }

    /**
     * Returns the room or null.
     * @param {string} meetingId
     */
    getRoom(meetingId) {
        return this._rooms.get(meetingId) ?? null;
    }

    /**
     * Marks room as ended without deleting — lets in-flight events resolve.
     * @param {string} meetingId
     */
    endRoom(meetingId) {
        const room = this._rooms.get(meetingId);
        if (room) room.status = ROOM_STATUS.ENDED;
    }

    /**
     * Deletes the room entry entirely.
     * @param {string} meetingId
     */
    removeRoom(meetingId) {
        this._rooms.delete(meetingId);
    }

    // ── Participant Management ────────────────────────────────────────────────

    /**
     * Adds a participant.
     * Returns false on duplicate join or if room is at capacity.
     * @param {string} meetingId
     * @param {string} userId
     * @param {string} socketId
     */
    addParticipant(meetingId, userId, socketId) {
        const room = this._rooms.get(meetingId);
        if (!room) return false;
        if (room.participants.has(userId)) return false;
        if (room.participants.size >= room.maxParticipants) return false;
        room.participants.set(userId, socketId);
        return true;
    }

    /**
     * Removes a participant by userId.
     * Auto-deletes the room when it becomes empty.
     * Returns the remaining room or null if deleted.
     * @param {string} meetingId
     * @param {string} userId
     */
    removeParticipant(meetingId, userId) {
        const room = this._rooms.get(meetingId);
        if (!room) return null;

        room.participants.delete(userId);

        if (room.participants.size === 0) {
            this.removeRoom(meetingId);
            return null;
        }

        return room;
    }

    /**
     * Returns all participants as [{ userId, socketId }].
     * Optionally excludes one userId.
     * @param {string} meetingId
     * @param {string|null} [excludeUserId]
     */
    getParticipants(meetingId, excludeUserId = null) {
        const room = this._rooms.get(meetingId);
        if (!room) return [];

        const result = [];
        for (const [userId, socketId] of room.participants) {
            if (userId !== excludeUserId) result.push({ userId, socketId });
        }
        return result;
    }

    /**
     * Returns the current participant count.
     * @param {string} meetingId
     */
    getParticipantCount(meetingId) {
        return this._rooms.get(meetingId)?.participants.size ?? 0;
    }

    /**
     * Returns true if the userId is already in the room.
     * @param {string} meetingId
     * @param {string} userId
     */
    isInRoom(meetingId, userId) {
        return this._rooms.get(meetingId)?.participants.has(userId) ?? false;
    }

    // ── Lock Management ───────────────────────────────────────────────────────

    /**
     * Locks the room — no new participants can join.
     * @param {string} meetingId
     */
    lockRoom(meetingId) {
        const room = this._rooms.get(meetingId);
        if (room) room.locked = true;
    }

    /**
     * Unlocks the room.
     * @param {string} meetingId
     */
    unlockRoom(meetingId) {
        const room = this._rooms.get(meetingId);
        if (room) room.locked = false;
    }

    /**
     * Returns true if the room is locked.
     * @param {string} meetingId
     */
    isRoomLocked(meetingId) {
        return this._rooms.get(meetingId)?.locked ?? false;
    }

    // ── Host Management ───────────────────────────────────────────────────────

    /**
     * Transfers host to the next available participant.
     * Returns the new hostId or null if no participants remain.
     * @param {string} meetingId
     */
    transferHost(meetingId) {
        const room = this._rooms.get(meetingId);
        if (!room || room.participants.size === 0) return null;

        // Pick the first remaining participant as new host
        const [newHostId] = room.participants.keys();
        room.hostId = newHostId;
        return newHostId;
    }

    // ── Lookup ────────────────────────────────────────────────────────────────

    /**
     * Finds which room a socketId belongs to.
     * Used during disconnect when meetingId is unknown.
     * Returns { meetingId, userId } or null.
     * @param {string} socketId
     */
    findParticipantBySocketId(socketId) {
        for (const [meetingId, room] of this._rooms) {
            for (const [userId, sid] of room.participants) {
                if (sid === socketId) return { meetingId, userId };
            }
        }
        return null;
    }

    // ── Snapshot ──────────────────────────────────────────────────────────────

    /**
     * Returns a serializable room snapshot safe to emit to clients.
     * @param {string} meetingId
     */
    getRoomSnapshot(meetingId) {
        const room = this._rooms.get(meetingId);
        if (!room) return null;

        return {
            meetingId: room.meetingId,
            hostId: room.hostId,
            participantCount: room.participants.size,
            participants: this.getParticipants(meetingId),
            status: room.status,
            locked: room.locked,
            maxParticipants: room.maxParticipants,
            createdAt: room.createdAt,
        };
    }

    /** Total active rooms — for monitoring. */
    get size() {
        return this._rooms.size;
    }
}

// Module-level singleton
const roomRegistry = new RoomRegistry();

export default roomRegistry;
