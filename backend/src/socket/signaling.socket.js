import { SOCKET_EVENTS } from "../constants/index.js";
import { socketErrorHandler } from "./middleware/error.socket.js";
import logger from "../utils/logger.js";
import {
    handleJoinRoom,
    handleLeaveRoom,
    handleDisconnect,
    validateOffer,
    validateAnswer,
    validateIceCandidate,
    validatePeerExists,
} from "./signaling.service.js";

export default function registerSignalingSocket(io) {
    io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
        const userId = socket.user.id;

        // ── join-room ─────────────────────────────────────────────────────────
        // Client emits: { meetingId }
        // Flow: validate meeting → guard duplicate → add to registry →
        //       notify existing peers → send peer list back to joiner
        socket.on(SOCKET_EVENTS.JOIN_ROOM, socketErrorHandler(socket, async ({ meetingId }) => {
            const { peers, roomSnapshot } = await handleJoinRoom(meetingId, userId, socket.id);

            // Join the Socket.IO room
            socket.join(meetingId);

            logger.info("User joined signaling room", {
                userId,
                socketId: socket.id,
                meetingId,
                peerCount: peers.length,
            });

            // Tell the new joiner who is already in the room
            // so the client can initiate offers to each existing peer
            socket.emit(SOCKET_EVENTS.ROOM_JOINED, {
                meetingId,
                room: roomSnapshot,
                peers, // [{ userId, socketId }]
            });

            // Notify every existing peer that a new participant arrived
            // Each peer will initiate an offer back to the new joiner
            peers.forEach(({ socketId: peerSocketId, userId: peerUserId }) => {
                io.to(peerSocketId).emit(SOCKET_EVENTS.PEER_CONNECTED, {
                    meetingId,
                    userId,       // the new joiner
                    socketId: socket.id,
                });

                logger.debug("Notified existing peer of new joiner", {
                    peerUserId,
                    newUserId: userId,
                    meetingId,
                });
            });
        }));

        // ── leave-room ────────────────────────────────────────────────────────
        // Client emits: { meetingId }
        socket.on(SOCKET_EVENTS.LEAVE_ROOM, socketErrorHandler(socket, async ({ meetingId }) => {
            handleLeaveRoom(meetingId, userId);
            socket.leave(meetingId);

            // Notify remaining peers
            io.to(meetingId).emit(SOCKET_EVENTS.PEER_DISCONNECTED, {
                meetingId,
                userId,
                socketId: socket.id,
            });

            logger.info("User left signaling room", { userId, socketId: socket.id, meetingId });
        }));

        // ── offer ─────────────────────────────────────────────────────────────
        // Client emits: { meetingId, targetUserId, offer }
        // Sender has called createOffer() and sends the SDP to a specific peer
        socket.on(SOCKET_EVENTS.OFFER, socketErrorHandler(socket, async ({ meetingId, targetUserId, offer }) => {
            validateOffer(offer);
            const targetSocketId = validatePeerExists(meetingId, targetUserId);

            io.to(targetSocketId).emit(SOCKET_EVENTS.OFFER, {
                meetingId,
                fromUserId: userId,
                fromSocketId: socket.id,
                offer,
            });

            logger.debug("SDP offer forwarded", {
                from: userId,
                to: targetUserId,
                meetingId,
            });
        }));

        // ── answer ────────────────────────────────────────────────────────────
        // Client emits: { meetingId, targetUserId, answer }
        // Receiver responds to an offer with their SDP answer
        socket.on(SOCKET_EVENTS.ANSWER, socketErrorHandler(socket, async ({ meetingId, targetUserId, answer }) => {
            validateAnswer(answer);
            const targetSocketId = validatePeerExists(meetingId, targetUserId);

            io.to(targetSocketId).emit(SOCKET_EVENTS.ANSWER, {
                meetingId,
                fromUserId: userId,
                fromSocketId: socket.id,
                answer,
            });

            logger.debug("SDP answer forwarded", {
                from: userId,
                to: targetUserId,
                meetingId,
            });
        }));

        // ── ice-candidate ─────────────────────────────────────────────────────
        // Client emits: { meetingId, targetUserId, candidate }
        // Trickle ICE: forward each candidate as it is discovered
        socket.on(SOCKET_EVENTS.ICE_CANDIDATE, socketErrorHandler(socket, async ({ meetingId, targetUserId, candidate }) => {
            validateIceCandidate(candidate);
            const targetSocketId = validatePeerExists(meetingId, targetUserId);

            io.to(targetSocketId).emit(SOCKET_EVENTS.ICE_CANDIDATE, {
                meetingId,
                fromUserId: userId,
                fromSocketId: socket.id,
                candidate,
            });

            logger.debug("ICE candidate forwarded", {
                from: userId,
                to: targetUserId,
                meetingId,
            });
        }));

        // ── peer-connected ────────────────────────────────────────────────────
        // Client emits: { meetingId, targetUserId }
        // Sent by a peer after the WebRTC connection is fully established (ICE complete)
        socket.on(SOCKET_EVENTS.PEER_CONNECTED, socketErrorHandler(socket, async ({ meetingId, targetUserId }) => {
            const targetSocketId = validatePeerExists(meetingId, targetUserId);

            io.to(targetSocketId).emit(SOCKET_EVENTS.PEER_CONNECTED, {
                meetingId,
                userId,
                socketId: socket.id,
            });

            logger.info("Peer connection established", {
                between: [userId, targetUserId],
                meetingId,
            });
        }));

        // ── peer-disconnected ─────────────────────────────────────────────────
        // Client emits: { meetingId, targetUserId }
        // Explicit peer disconnect notification (before leaving room)
        socket.on(SOCKET_EVENTS.PEER_DISCONNECTED, socketErrorHandler(socket, async ({ meetingId, targetUserId }) => {
            // Target may have already left — do not throw, just log
            const room = io.sockets.adapter.rooms.get(meetingId);
            if (room) {
                io.to(meetingId).emit(SOCKET_EVENTS.PEER_DISCONNECTED, {
                    meetingId,
                    userId,
                    socketId: socket.id,
                });
            }

            logger.info("Peer disconnected event received", {
                from: userId,
                target: targetUserId,
                meetingId,
            });
        }));

        // ── disconnect ────────────────────────────────────────────────────────
        // Fired automatically by Socket.IO when the connection drops
        socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
            const found = handleDisconnect(socket.id);

            if (found) {
                const { meetingId } = found;

                // Notify remaining peers in the room
                io.to(meetingId).emit(SOCKET_EVENTS.PEER_DISCONNECTED, {
                    meetingId,
                    userId,
                    socketId: socket.id,
                });

                logger.info("User removed from signaling room on disconnect", {
                    userId,
                    socketId: socket.id,
                    meetingId,
                    reason,
                });
            }
        });
    });
}
