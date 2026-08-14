import mongoose from "mongoose";
import { SOCKET_EVENTS } from "../constants/index.js";
import {
    findMeetingById,
    addToWaitingQueue,
    removeFromWaitingQueue,
    addParticipant,
    updateMeetingById,
} from "../repositories/meeting.repository.js";
import { socketErrorHandler } from "./middleware/error.socket.js";
import logger from "../utils/logger.js";

export default function registerMeetingSocket(io) {
    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        // userId is guaranteed by auth middleware
        const userId = socket.user.id;

        logger.info("User connected to meeting socket", { userId, socketId: socket.id });

        // ─── Helpers ──────────────────────────────────────────────────────

        const assertHost = async (meetingId) => {
            if (!mongoose.Types.ObjectId.isValid(meetingId)) return null;
            const meeting = await findMeetingById(meetingId);
            return meeting?.host._id.toString() === userId ? meeting : null;
        };

        // ─── Join call room ───────────────────────────────────────────────

        socket.on(SOCKET_EVENTS.JOIN_CALL, socketErrorHandler(socket, async (meetingId) => {
            if (!mongoose.Types.ObjectId.isValid(meetingId)) return;
            const meeting = await findMeetingById(meetingId);
            if (!meeting || meeting.status === "ended") return;

            const isHost = meeting.host._id.toString() === userId;

            if (meeting.waitingRoom && !isHost) {
                await addToWaitingQueue(meetingId, userId);
                socket.join(`waiting:${meetingId}`);
                io.to(`host:${meetingId}`).emit(SOCKET_EVENTS.WAITING_ROOM_REQUEST, {
                    userId,
                    socketId: socket.id,
                });
                logger.debug("User added to waiting room", { userId, meetingId });
                return;
            }

            socket.join(meetingId);
            if (isHost) socket.join(`host:${meetingId}`);

            socket.to(meetingId).emit(SOCKET_EVENTS.USER_JOINED, { socketId: socket.id, userId });
            logger.info("User joined meeting room", { userId, meetingId });
        }));

        // ─── Waiting Room ─────────────────────────────────────────────────

        socket.on(SOCKET_EVENTS.WAITING_ROOM_ADMITTED, socketErrorHandler(socket, async ({ meetingId, targetUserId, targetSocketId }) => {
            const meeting = await assertHost(meetingId);
            if (!meeting) return;

            await removeFromWaitingQueue(meetingId, targetUserId);
            await addParticipant(meetingId, targetUserId);

            const targetSocket = io.sockets.sockets.get(targetSocketId);
            if (targetSocket) {
                targetSocket.leave(`waiting:${meetingId}`);
                targetSocket.join(meetingId);
                targetSocket.emit(SOCKET_EVENTS.WAITING_ROOM_ADMITTED, { meetingId });
                socket.to(meetingId).emit(SOCKET_EVENTS.USER_JOINED, { socketId: targetSocketId, userId: targetUserId });
            }
            logger.info("Participant admitted from waiting room", { targetUserId, meetingId });
        }));

        socket.on(SOCKET_EVENTS.WAITING_ROOM_REJECTED, socketErrorHandler(socket, async ({ meetingId, targetUserId, targetSocketId }) => {
            const meeting = await assertHost(meetingId);
            if (!meeting) return;

            await removeFromWaitingQueue(meetingId, targetUserId);

            const targetSocket = io.sockets.sockets.get(targetSocketId);
            if (targetSocket) {
                targetSocket.emit(SOCKET_EVENTS.WAITING_ROOM_REJECTED, { meetingId });
                targetSocket.leave(`waiting:${meetingId}`);
            }
            logger.info("Participant rejected from waiting room", { targetUserId, meetingId });
        }));

        // ─── Host Controls ────────────────────────────────────────────────

        socket.on(SOCKET_EVENTS.MUTE_USER, socketErrorHandler(socket, async ({ meetingId, targetSocketId }) => {
            if (!await assertHost(meetingId)) return;
            io.to(targetSocketId).emit(SOCKET_EVENTS.MUTE_USER, { meetingId });
        }));

        socket.on(SOCKET_EVENTS.UNMUTE_USER, socketErrorHandler(socket, async ({ meetingId, targetSocketId }) => {
            if (!await assertHost(meetingId)) return;
            io.to(targetSocketId).emit(SOCKET_EVENTS.UNMUTE_USER, { meetingId });
        }));

        socket.on(SOCKET_EVENTS.REMOVE_PARTICIPANT, socketErrorHandler(socket, async ({ meetingId, targetSocketId, targetUserId }) => {
            if (!await assertHost(meetingId)) return;
            const targetSocket = io.sockets.sockets.get(targetSocketId);
            if (targetSocket) {
                targetSocket.emit(SOCKET_EVENTS.REMOVE_PARTICIPANT, { meetingId });
                targetSocket.leave(meetingId);
            }
            io.to(meetingId).emit(SOCKET_EVENTS.USER_LEFT, { userId: targetUserId, socketId: targetSocketId });
        }));

        socket.on(SOCKET_EVENTS.MEETING_LOCKED, socketErrorHandler(socket, async ({ meetingId }) => {
            if (!await assertHost(meetingId)) return;
            await updateMeetingById(meetingId, { isLocked: true });
            io.to(meetingId).emit(SOCKET_EVENTS.MEETING_LOCKED, { meetingId });
        }));

        socket.on(SOCKET_EVENTS.MEETING_UNLOCKED, socketErrorHandler(socket, async ({ meetingId }) => {
            if (!await assertHost(meetingId)) return;
            await updateMeetingById(meetingId, { isLocked: false });
            io.to(meetingId).emit(SOCKET_EVENTS.MEETING_UNLOCKED, { meetingId });
        }));

        socket.on(SOCKET_EVENTS.CHAT_DISABLED, socketErrorHandler(socket, async ({ meetingId }) => {
            if (!await assertHost(meetingId)) return;
            await updateMeetingById(meetingId, { isChatDisabled: true });
            io.to(meetingId).emit(SOCKET_EVENTS.CHAT_DISABLED, { meetingId });
        }));

        socket.on(SOCKET_EVENTS.CHAT_ENABLED, socketErrorHandler(socket, async ({ meetingId }) => {
            if (!await assertHost(meetingId)) return;
            await updateMeetingById(meetingId, { isChatDisabled: false });
            io.to(meetingId).emit(SOCKET_EVENTS.CHAT_ENABLED, { meetingId });
        }));

        socket.on(SOCKET_EVENTS.SCREEN_SHARE_PERMISSION, socketErrorHandler(socket, async ({ meetingId, allowed }) => {
            if (!await assertHost(meetingId)) return;
            await updateMeetingById(meetingId, { screenSharePermission: allowed });
            io.to(meetingId).emit(SOCKET_EVENTS.SCREEN_SHARE_PERMISSION, { meetingId, allowed });
        }));

        socket.on(SOCKET_EVENTS.RECORDING_PERMISSION, socketErrorHandler(socket, async ({ meetingId, allowed }) => {
            if (!await assertHost(meetingId)) return;
            await updateMeetingById(meetingId, { recordingPermission: allowed });
            io.to(meetingId).emit(SOCKET_EVENTS.RECORDING_PERMISSION, { meetingId, allowed });
        }));

        // ─── Disconnect ───────────────────────────────────────────────────

        socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
            logger.info("User disconnected from meeting socket", { userId, socketId: socket.id, reason });
            socket.rooms.forEach((room) => {
                socket.to(room).emit(SOCKET_EVENTS.USER_LEFT, { socketId: socket.id, userId });
            });
        });
    });
}
