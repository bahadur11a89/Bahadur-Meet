import { ROOM_STATUS } from "../constants/index.js";

/**
 * In-memory room registry.
 *
 * Structure:
 *   rooms: Map<meetingId, RoomState>
 *
 * RoomState: {
 *   meetingId:    string,
 *   hostId:       string,
 *   participants: Map<userId, socketId>,   // userId → socketId
 *   joinedAt:     Date,
 *   status:       "active" | "ended",
 * }
 *
 * This is intentionally a module-level singleton.
 * Import getRoomRegistry() wherever room state is needed.
 */

class RoomRegistry {
    constructor() {
        /** @type {Map<string, Object>} */
        this._rooms = new Map();
    }

    // ── Room Lifecycle ────────────────────────────────────────────────────────

    /**
     * Creates a new room entry. Idempotent — returns existing room if already present.
     */
    createRoom(meetingId, hostId) {
        if (!this._rooms.has(meetingId)) {
            this._rooms.set(meetingId, {
                meetingId,
                hostId,
                participants: new Map(), // userId → socketId
                joinedAt: new Date(),
                status: ROOM_STATUS.ACTIVE,
            });
        }
        return this._rooms.get(meetingId);
    }

    /**
     * Returns the room state or null if not found.
     */
    getRoom(meetingId) {
        return this._rooms.get(meetingId) ?? null;
    }

    /**
     * Marks a room as ended. Does NOT delete it immediately —
     * allows in-flight events to resolve cleanly.
     */
    endRoom(meetingId) {
        const room = this._rooms.get(meetingId);
        if (room) room.status = ROOM_STATUS.ENDED;
    }

    /**
     * Deletes the room entry entirely.
     * Called when the last participant leaves.
     */
    deleteRoom(meetingId) {
        this._rooms.delete(meetingId);
    }

    // ── Participant Management ────────────────────────────────────────────────

    /**
     * Adds a participant to the room.
     * Returns false if the userId is already present (duplicate join guard).
     */
    addParticipant(meetingId, userId, socketId) {
        const room = this._rooms.get(meetingId);
        if (!room) return false;
        if (room.participants.has(userId)) return false; // duplicate join
        room.participants.set(userId, socketId);
        return true;
    }

    /**
     * Removes a participant by userId.
     * Automatically deletes the room if it becomes empty.
     * Returns the deleted room if it was removed, otherwise null.
     */
    removeParticipant(meetingId, userId) {
        const room = this._rooms.get(meetingId);
        if (!room) return null;

        room.participants.delete(userId);

        if (room.participants.size === 0) {
            this.deleteRoom(meetingId);
            return null; // room deleted
        }

        return room;
    }

    /**
     * Finds which room a given socketId belongs to.
     * Used during disconnect to clean up without knowing the meetingId.
     * Returns { meetingId, userId } or null.
     */
    findParticipantBySocketId(socketId) {
        for (const [meetingId, room] of this._rooms) {
            for (const [userId, sid] of room.participants) {
                if (sid === socketId) return { meetingId, userId };
            }
        }
        return null;
    }

    /**
     * Returns true if a userId is already in the room.
     */
    isInRoom(meetingId, userId) {
        return this._rooms.get(meetingId)?.participants.has(userId) ?? false;
    }

    /**
     * Returns all participants in a room as an array of { userId, socketId }.
     * Excludes the given userId (used to notify existing peers of a new joiner).
     */
    getPeers(meetingId, excludeUserId = null) {
        const room = this._rooms.get(meetingId);
        if (!room) return [];

        const peers = [];
        for (const [userId, socketId] of room.participants) {
            if (userId !== excludeUserId) {
                peers.push({ userId, socketId });
            }
        }
        return peers;
    }

    /**
     * Returns a plain serializable snapshot of a room (safe to emit to clients).
     */
    getRoomSnapshot(meetingId) {
        const room = this._rooms.get(meetingId);
        if (!room) return null;

        return {
            meetingId: room.meetingId,
            hostId: room.hostId,
            participantCount: room.participants.size,
            joinedAt: room.joinedAt,
            status: room.status,
        };
    }

    /**
     * Returns total number of active rooms (for monitoring/logging).
     */
    get size() {
        return this._rooms.size;
    }
}

// Module-level singleton
const roomRegistry = new RoomRegistry();

export default roomRegistry;
