import { SOCKET_EVENTS } from "../constants/index.js";
import { socketErrorHandler } from "./middleware/error.socket.js";
import logger from "../utils/logger.js";
import {
    setOnline,
    setOffline,
    updateStatus,
    joinMeeting,
    leaveMeeting,
    heartbeat,
    getPresence,
} from "../services/presence.service.js";
import {
    validatePresenceOnline,
    validatePresenceUpdate,
    validatePresenceGet,
    validateHeartbeat,
    validateJoinMeeting,
} from "../validators/presence.validator.js";

// Dedicated Socket.IO room for broadcasting presence events to all online users
const PRESENCE_ROOM = "presence:global";

export default function registerPresenceSocket(io) {
    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        const userId = socket.user.id;

        // ── presence:online ───────────────────────────────────────────────────
        // Client emits immediately after connecting.
        // Payload: { device? }
        socket.on(SOCKET_EVENTS.PRESENCE_ONLINE, socketErrorHandler(socket, async (payload = {}) => {
            validatePresenceOnline(payload);

            const snapshot = await setOnline(userId, socket.id, payload.device ?? null);

            // Subscribe this socket to the global presence broadcast room
            socket.join(PRESENCE_ROOM);

            // Confirm to the connecting client
            socket.emit(SOCKET_EVENTS.PRESENCE_STATE, snapshot);

            // Broadcast to all other online users
            socket.to(PRESENCE_ROOM).emit(SOCKET_EVENTS.USER_ONLINE, {
                userId,
                status: snapshot.status,
            });

            logger.info("User presence online", {
                userId,
                socketId: socket.id,
                device: payload.device,
                socketCount: snapshot.socketCount,
            });
        }));

        // ── presence:update ───────────────────────────────────────────────────
        // Client sets own status to ONLINE or AWAY.
        // Payload: { status }
        socket.on(SOCKET_EVENTS.PRESENCE_UPDATE, socketErrorHandler(socket, async (payload = {}) => {
            validatePresenceUpdate(payload);

            // Security: user can only update their own presence
            const snapshot = await updateStatus(userId, userId, payload.status);

            // Broadcast updated status to all online users
            io.to(PRESENCE_ROOM).emit(SOCKET_EVENTS.USER_PRESENCE_UPDATE, {
                userId,
                status: snapshot.status,
                meetingId: snapshot.meetingId,
            });

            logger.debug("Presence status updated", { userId, status: payload.status });
        }));

        // ── presence:get ──────────────────────────────────────────────────────
        // Client requests presence info for any userId.
        // Payload: { userId }
        socket.on(SOCKET_EVENTS.PRESENCE_GET, socketErrorHandler(socket, async (payload = {}) => {
            validatePresenceGet(payload);

            const presence = await getPresence(payload.userId);

            // Respond only to the requesting socket
            socket.emit(SOCKET_EVENTS.PRESENCE_STATE, presence);
        }));

        // ── presence:heartbeat ────────────────────────────────────────────────
        // Client sends every 20–30 seconds to signal it is still active.
        // Payload: { timestamp }
        socket.on(SOCKET_EVENTS.PRESENCE_HEARTBEAT, socketErrorHandler(socket, async (payload = {}) => {
            validateHeartbeat(payload);

            const lastSeen = await heartbeat(userId, payload.timestamp);

            // Acknowledge back to the client only — no broadcast needed
            socket.emit(SOCKET_EVENTS.PRESENCE_HEARTBEAT, { lastSeen });

            logger.debug("Heartbeat received", { userId, socketId: socket.id });
        }));

        // ── presence:join-meeting ─────────────────────────────────────────────
        // Client emits when entering a meeting room.
        // Payload: { meetingId }
        socket.on("presence:join-meeting", socketErrorHandler(socket, async (payload = {}) => {
            validateJoinMeeting(payload);

            const snapshot = await joinMeeting(userId, payload.meetingId);

            // Broadcast updated status to all online users
            io.to(PRESENCE_ROOM).emit(SOCKET_EVENTS.USER_PRESENCE_UPDATE, {
                userId,
                status: snapshot.status,
                meetingId: snapshot.meetingId,
            });

            logger.info("User joined meeting (presence)", {
                userId,
                meetingId: payload.meetingId,
            });
        }));

        // ── presence:leave-meeting ────────────────────────────────────────────
        // Client emits when leaving a meeting room.
        // No payload required.
        socket.on("presence:leave-meeting", socketErrorHandler(socket, async () => {
            const snapshot = await leaveMeeting(userId);

            io.to(PRESENCE_ROOM).emit(SOCKET_EVENTS.USER_PRESENCE_UPDATE, {
                userId,
                status: snapshot.status,
                meetingId: null,
            });

            logger.info("User left meeting (presence)", { userId });
        }));

        // ── presence:offline ──────────────────────────────────────────────────
        // Client can emit explicitly before closing the tab.
        // Also handled automatically on disconnect below.
        socket.on(SOCKET_EVENTS.PRESENCE_OFFLINE, socketErrorHandler(socket, async () => {
            const result = await setOffline(socket.id);
            if (!result) return;

            const { isFullyOffline, lastSeen } = result;

            if (isFullyOffline) {
                socket.to(PRESENCE_ROOM).emit(SOCKET_EVENTS.USER_OFFLINE, {
                    userId,
                    lastSeen,
                });
            }

            socket.leave(PRESENCE_ROOM);
            logger.info("User presence offline (explicit)", { userId, isFullyOffline });
        }));

        // ── disconnect ────────────────────────────────────────────────────────
        // Fired automatically by Socket.IO on transport drop.
        // Handles multi-device: only broadcasts USER_OFFLINE when last socket drops.
        socket.on(SOCKET_EVENTS.DISCONNECT, async (reason) => {
            try {
                const result = await setOffline(socket.id);
                if (!result) return;

                const { isFullyOffline, lastSeen } = result;

                if (isFullyOffline) {
                    // All devices disconnected — broadcast offline to everyone
                    io.to(PRESENCE_ROOM).emit(SOCKET_EVENTS.USER_OFFLINE, {
                        userId,
                        lastSeen,
                    });

                    logger.info("User fully offline", {
                        userId,
                        socketId: socket.id,
                        reason,
                        lastSeen,
                    });
                } else {
                    // Still has other active sockets — just log
                    logger.info("Socket disconnected (user still has active sockets)", {
                        userId,
                        socketId: socket.id,
                        reason,
                    });
                }
            } catch (err) {
                logger.error("Error during presence disconnect cleanup", {
                    socketId: socket.id,
                    error: err.message,
                });
            }
        });
    });
}
