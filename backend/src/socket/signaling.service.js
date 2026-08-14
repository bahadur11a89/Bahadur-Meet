import { findMeetingById } from "../repositories/meeting.repository.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import roomRegistry from "../registry/room.registry.js";

/**
 * Validates that a meeting exists, is live, and is not locked.
 * Returns the meeting document on success.
 * Throws ApiError on any validation failure.
 */
export const validateMeetingForJoin = async (meetingId) => {
    const meeting = await findMeetingById(meetingId);

    if (!meeting) {
        throw new ApiError(httpStatus.NOT_FOUND, "Meeting not found");
    }

    if (meeting.status === "ended") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Meeting has already ended");
    }

    if (meeting.isLocked) {
        throw new ApiError(httpStatus.FORBIDDEN, "Meeting is locked by the host");
    }

    return meeting;
};

/**
 * Handles a user joining a signaling room.
 * - Validates the meeting from DB
 * - Guards against duplicate joins
 * - Creates the room in registry if it does not exist
 * - Adds the participant to the registry
 *
 * Returns: { meeting, peers, roomSnapshot }
 */
export const handleJoinRoom = async (meetingId, userId, socketId) => {
    const meeting = await validateMeetingForJoin(meetingId);

    // Duplicate join guard
    if (roomRegistry.isInRoom(meetingId, userId)) {
        throw new ApiError(httpStatus.CONFLICT, "Already in this room");
    }

    // Create room on first join, using DB host as hostId
    const hostId = meeting.host._id.toString();
    roomRegistry.createRoom(meetingId, hostId);

    // Capture existing peers BEFORE adding the new participant
    // so we can tell the new joiner who is already there
    const peers = roomRegistry.getPeers(meetingId, userId);

    // Add new participant
    roomRegistry.addParticipant(meetingId, userId, socketId);

    const roomSnapshot = roomRegistry.getRoomSnapshot(meetingId);

    return { meeting, peers, roomSnapshot };
};

/**
 * Handles a user leaving a signaling room.
 * - Removes participant from registry
 * - Returns remaining room state (or null if room was deleted)
 */
export const handleLeaveRoom = (meetingId, userId) => {
    const remainingRoom = roomRegistry.removeParticipant(meetingId, userId);
    return remainingRoom;
};

/**
 * Handles socket disconnect — finds which room the socket was in
 * and removes the participant.
 * Returns { meetingId, userId } if found, null otherwise.
 */
export const handleDisconnect = (socketId) => {
    const found = roomRegistry.findParticipantBySocketId(socketId);
    if (!found) return null;

    roomRegistry.removeParticipant(found.meetingId, found.userId);
    return found;
};

/**
 * Validates an SDP offer payload.
 * Throws ApiError if the payload is malformed.
 */
export const validateOffer = (offer) => {
    if (!offer || typeof offer !== "object") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid offer: must be an object");
    }
    if (offer.type !== "offer") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid offer: type must be 'offer'");
    }
    if (typeof offer.sdp !== "string" || !offer.sdp.trim()) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid offer: sdp must be a non-empty string");
    }
};

/**
 * Validates an SDP answer payload.
 * Throws ApiError if the payload is malformed.
 */
export const validateAnswer = (answer) => {
    if (!answer || typeof answer !== "object") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid answer: must be an object");
    }
    if (answer.type !== "answer") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid answer: type must be 'answer'");
    }
    if (typeof answer.sdp !== "string" || !answer.sdp.trim()) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid answer: sdp must be a non-empty string");
    }
};

/**
 * Validates an ICE candidate payload.
 * Throws ApiError if the payload is malformed.
 */
export const validateIceCandidate = (candidate) => {
    if (!candidate || typeof candidate !== "object") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ICE candidate: must be an object");
    }
    if (typeof candidate.candidate !== "string") {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid ICE candidate: candidate field must be a string");
    }
};

/**
 * Validates that a target peer exists in the room registry.
 * Throws ApiError if the peer is not found.
 */
export const validatePeerExists = (meetingId, targetUserId) => {
    const room = roomRegistry.getRoom(meetingId);
    if (!room || !room.participants.has(targetUserId)) {
        throw new ApiError(httpStatus.NOT_FOUND, `Peer ${targetUserId} not found in room`);
    }
    return room.participants.get(targetUserId); // returns socketId
};
