import { PRESENCE_STATUS } from "../constants/index.js";

/**
 * In-memory Presence Registry — Phase 4.4.
 *
 * Multi-device design:
 *   _users:   Map<userId, UserPresence>
 *   _sockets: Map<socketId, userId>   ← reverse index for O(1) disconnect lookup
 *
 * UserPresence shape:
 * {
 *   userId:      string,
 *   sockets:     Set<socketId>,        ← all active sockets for this user
 *   status:      PRESENCE_STATUS,
 *   meetingId:   string | null,
 *   device:      string | null,
 *   lastSeen:    Date,
 *   connectedAt: Date,
 * }
 *
 * Singleton — import presenceRegistry directly.
 */
class PresenceRegistry {
    constructor() {
        /** @type {Map<string, Object>} userId → UserPresence */
        this._users = new Map();

        /** @type {Map<string, string>} socketId → userId  (reverse index) */
        this._sockets = new Map();
    }

    // ── Socket Registration ───────────────────────────────────────────────────

    /**
     * Registers a new socket for a user.
     * Creates the user entry if it does not exist (first device).
     * Returns the updated UserPresence.
     *
     * @param {string} userId
     * @param {string} socketId
     * @param {string} [device]  - e.g. "desktop", "mobile"
     */
    addUserPresence(userId, socketId, device = null) {
        if (!this._users.has(userId)) {
            this._users.set(userId, {
                userId,
                sockets: new Set(),
                status: PRESENCE_STATUS.ONLINE,
                meetingId: null,
                device,
                lastSeen: new Date(),
                connectedAt: new Date(),
            });
        }

        const entry = this._users.get(userId);
        entry.sockets.add(socketId);
        entry.status = PRESENCE_STATUS.ONLINE;
        entry.lastSeen = new Date();

        // Reverse index
        this._sockets.set(socketId, userId);

        return entry;
    }

    /**
     * Removes a socket from a user's socket set.
     * If the user has no remaining sockets, marks them OFFLINE and removes the entry.
     *
     * @param {string} socketId
     * @returns {{ userId, isFullyOffline, lastSeen } | null}
     */
    removeSocket(socketId) {
        const userId = this._sockets.get(socketId);
        if (!userId) return null;

        this._sockets.delete(socketId);

        const entry = this._users.get(userId);
        if (!entry) return null;

        entry.sockets.delete(socketId);
        entry.lastSeen = new Date();

        if (entry.sockets.size === 0) {
            // All devices disconnected — mark offline then remove
            entry.status = PRESENCE_STATUS.OFFLINE;
            const lastSeen = entry.lastSeen;
            this._users.delete(userId);
            return { userId, isFullyOffline: true, lastSeen };
        }

        return { userId, isFullyOffline: false, lastSeen: entry.lastSeen };
    }

    // ── Status Management ─────────────────────────────────────────────────────

    /**
     * Updates the status (and optionally meetingId) for a user.
     * No-op if user is not in registry.
     *
     * @param {string} userId
     * @param {string} status
     * @param {string|null} [meetingId]
     */
    updateStatus(userId, status, meetingId = undefined) {
        const entry = this._users.get(userId);
        if (!entry) return null;

        entry.status = status;
        entry.lastSeen = new Date();

        if (meetingId !== undefined) {
            entry.meetingId = meetingId;
        }

        return entry;
    }

    /**
     * Refreshes lastSeen for a user (heartbeat).
     * @param {string} userId
     */
    updateLastSeen(userId) {
        const entry = this._users.get(userId);
        if (entry) entry.lastSeen = new Date();
        return entry ?? null;
    }

    // ── Lookups ───────────────────────────────────────────────────────────────

    /**
     * Returns the UserPresence for a userId, or null.
     * @param {string} userId
     */
    getUserPresence(userId) {
        return this._users.get(userId) ?? null;
    }

    /**
     * Resolves a socketId to its userId.
     * @param {string} socketId
     */
    findUserBySocketId(socketId) {
        return this._sockets.get(socketId) ?? null;
    }

    /**
     * Returns all online users as an array of presence snapshots.
     */
    getOnlineUsers() {
        const result = [];
        for (const entry of this._users.values()) {
            if (entry.status !== PRESENCE_STATUS.OFFLINE) {
                result.push(this._snapshot(entry));
            }
        }
        return result;
    }

    /**
     * Returns all users currently IN_MEETING for a given meetingId.
     * @param {string} meetingId
     */
    getMeetingParticipants(meetingId) {
        const result = [];
        for (const entry of this._users.values()) {
            if (entry.meetingId === meetingId) {
                result.push(this._snapshot(entry));
            }
        }
        return result;
    }

    /**
     * Returns true if the user has at least one active socket.
     * @param {string} userId
     */
    isOnline(userId) {
        const entry = this._users.get(userId);
        return entry ? entry.sockets.size > 0 : false;
    }

    // ── Snapshot ──────────────────────────────────────────────────────────────

    /**
     * Returns a serializable snapshot safe to emit to clients.
     * @param {string|Object} userIdOrEntry
     */
    getSnapshot(userIdOrEntry) {
        const entry =
            typeof userIdOrEntry === "string"
                ? this._users.get(userIdOrEntry)
                : userIdOrEntry;

        return entry ? this._snapshot(entry) : null;
    }

    _snapshot(entry) {
        return {
            userId:       entry.userId,
            status:       entry.status,
            meetingId:    entry.meetingId,
            device:       entry.device,
            lastSeen:     entry.lastSeen,
            connectedAt:  entry.connectedAt,
            socketCount:  entry.sockets.size,
        };
    }

    /** Total tracked users (for monitoring). */
    get size() {
        return this._users.size;
    }
}

// Module-level singleton
const presenceRegistry = new PresenceRegistry();

export default presenceRegistry;
