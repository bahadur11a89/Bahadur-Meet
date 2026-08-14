import { SOCKET_EVENTS } from "../constants/index.js";
import { socketErrorHandler } from "./middleware/error.socket.js";
import logger from "../utils/logger.js";
import {
    createRoom,
    joinRoom,
    leaveRoom,
    lockRoom,
    unlockRoom,
    removeParticipantFromRoom,
    endMeeting,
    handleSocketDisconnect,
} from "../services/room.service.js";
import {
    validateRoomCreate,
    validateRoomJoin,
    validateRoomLeave,
    validateRoomLock,
    validateRoomRemoveUser,
    validateRoomEnd,
} from "../validators/room.validator.js";

export default function registerRoomSocket(io) {
    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        const userId = socket.user.id;

        // ── room:create ───────────────────────────────────────────────────────
        // Payload: { meetingId, maxParticipants? }
        // The meeting document must already exist (created via REST POST /meetings/create)
        socket.on(SOCKET_EVENTS.ROOM_CREATE, socketErrorHandler(socket, async (payload) => {
            validateRoomCreate(payload);
            const { meetingId, maxParticipants } = payload;

            const { room } = await createRoom(meetingId, userId, socket.id, maxParticipants);

            socket.join(meetingId);

            socket.emit(SOCKET_EVENTS.ROOM_CREATED, {
                meetingId: room.meetingId,
                hostId: room.hostId,
                room,
            });

            logger.info("Room created", { meetingId, hostId: userId, socketId: socket.id });
        }));

        // ── room:join ─────────────────────────────────────────────────────────
        // Payload: { meetingId }
        socket.on(SOCKET_EVENTS.ROOM_JOIN, socketErrorHandler(socket, async (payload) => {
            validateRoomJoin(payload);
            const { meetingId } = payload;

            const { room, participants } = await joinRoom(meetingId, userId, socket.id);

            socket.join(meetingId);

            // Confirm join to the new participant
            socket.emit(SOCKET_EVENTS.ROOM_JOINED, {
                meetingId,
                room,
                participants,
            });

            // Notify everyone else in the room
            socket.to(meetingId).emit(SOCKET_EVENTS.ROOM_USER_JOINED, {
                userId,
                socketId: socket.id,
                participants,
            });

            logger.info("User joined room", {
                userId,
                socketId: socket.id,
                meetingId,
                participantCount: participants.length,
            });
        }));

        // ── room:leave ────────────────────────────────────────────────────────
        // Payload: { meetingId }
        socket.on(SOCKET_EVENTS.ROOM_LEAVE, socketErrorHandler(socket, async (payload) => {
            validateRoomLeave(payload);
            const { meetingId } = payload;

            const { newHostId, roomDeleted } = await leaveRoom(meetingId, userId);

            socket.leave(meetingId);

            io.to(meetingId).emit(SOCKET_EVENTS.ROOM_USER_LEFT, {
                userId,
                socketId: socket.id,
                newHostId,
                roomDeleted,
            });

            logger.info("User left room", { userId, meetingId, newHostId, roomDeleted });
        }));

        // ── room:lock ─────────────────────────────────────────────────────────
        // Payload: { meetingId }
        // Host only
        socket.on(SOCKET_EVENTS.ROOM_LOCK, socketErrorHandler(socket, async (payload) => {
            validateRoomLock(payload);
            const { meetingId } = payload;

            await lockRoom(meetingId, userId);

            io.to(meetingId).emit(SOCKET_EVENTS.ROOM_LOCKED, { meetingId });

            logger.info("Room locked", { meetingId, hostId: userId });
        }));

        // ── room:unlock ───────────────────────────────────────────────────────
        // Payload: { meetingId }
        // Host only
        socket.on(SOCKET_EVENTS.ROOM_UNLOCK, socketErrorHandler(socket, async (payload) => {
            validateRoomLock(payload);
            const { meetingId } = payload;

            await unlockRoom(meetingId, userId);

            io.to(meetingId).emit(SOCKET_EVENTS.ROOM_UNLOCKED, { meetingId });

            logger.info("Room unlocked", { meetingId, hostId: userId });
        }));

        // ── room:remove-user ──────────────────────────────────────────────────
        // Payload: { meetingId, targetUserId }
        // Host only — forcibly removes a participant and disconnects their socket
        socket.on(SOCKET_EVENTS.ROOM_REMOVE_USER, socketErrorHandler(socket, async (payload) => {
            validateRoomRemoveUser(payload);
            const { meetingId, targetUserId } = payload;

            const targetSocketId = await removeParticipantFromRoom(meetingId, userId, targetUserId);

            // Notify the removed user directly
            const targetSocket = io.sockets.sockets.get(targetSocketId);
            if (targetSocket) {
                targetSocket.emit(SOCKET_EVENTS.ROOM_USER_LEFT, {
                    userId: targetUserId,
                    socketId: targetSocketId,
                    removed: true,
                });
                targetSocket.leave(meetingId);
            }

            // Notify the rest of the room
            io.to(meetingId).emit(SOCKET_EVENTS.ROOM_USER_LEFT, {
                userId: targetUserId,
                socketId: targetSocketId,
                removed: true,
            });

            logger.info("Participant removed by host", {
                meetingId,
                hostId: userId,
                removedUserId: targetUserId,
            });
        }));

        // ── room:end-meeting ──────────────────────────────────────────────────
        // Payload: { meetingId }
        // Host only — ends meeting, disconnects all participants
        socket.on(SOCKET_EVENTS.ROOM_END_MEETING, socketErrorHandler(socket, async (payload) => {
            validateRoomEnd(payload);
            const { meetingId } = payload;

            const { participantSocketIds } = await endMeeting(meetingId, userId);

            // Notify all participants the meeting has ended
            io.to(meetingId).emit(SOCKET_EVENTS.ROOM_ENDED, {
                meetingId,
                endedBy: userId,
            });

            // Force-leave all participant sockets from the room
            participantSocketIds.forEach((sid) => {
                const s = io.sockets.sockets.get(sid);
                if (s) s.leave(meetingId);
            });

            logger.info("Meeting ended by host", {
                meetingId,
                hostId: userId,
                participantsNotified: participantSocketIds.length,
            });
        }));

        // ── disconnect ────────────────────────────────────────────────────────
        // Fired automatically by Socket.IO on transport drop
        socket.on(SOCKET_EVENTS.DISCONNECT, async (reason) => {
            try {
                const result = await handleSocketDisconnect(socket.id);
                if (!result) return;

                const { meetingId, newHostId, roomDeleted } = result;

                io.to(meetingId).emit(SOCKET_EVENTS.ROOM_USER_LEFT, {
                    userId,
                    socketId: socket.id,
                    newHostId,
                    roomDeleted,
                });

                logger.info("Socket disconnected — participant removed from room", {
                    userId,
                    socketId: socket.id,
                    meetingId,
                    newHostId,
                    roomDeleted,
                    reason,
                });
            } catch (err) {
                logger.error("Error during disconnect cleanup", {
                    socketId: socket.id,
                    error: err.message,
                });
            }
        });
    });
}
