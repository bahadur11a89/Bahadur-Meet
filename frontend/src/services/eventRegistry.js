/**
 * A centralized, immutable registry of all Socket.IO event names used in the application.
 * Must match backend/src/constants/index.js
 */
export const SOCKET_EVENTS = Object.freeze({
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    CONNECT: "connect",
    CONNECT_ERROR: "connect_error",
    RECONNECT_ATTEMPT: "reconnect_attempt",
    RECONNECT: "reconnect",
    RECONNECT_ERROR: "reconnect_error",
    RECONNECT_FAILED: "reconnect_failed",
    ERROR: "error",

    JOIN_CALL: "join-call",
    USER_JOINED: "user-joined",
    USER_LEFT: "user-left",

    SIGNAL: "signal",

    CHAT_MESSAGE: "chat-message",

    SCREEN_SHARE_START: "screen-share-start",
    SCREEN_SHARE_STOP: "screen-share-stop",

    // Meeting lifecycle
    MEETING_ENDED: "meeting-ended",

    // Waiting room
    WAITING_ROOM_REQUEST: "waiting-room-request",
    WAITING_ROOM_ADMITTED: "waiting-room-admitted",
    WAITING_ROOM_REJECTED: "waiting-room-rejected",

    // Host controls
    MUTE_USER: "mute-user",
    UNMUTE_USER: "unmute-user",
    REMOVE_PARTICIPANT: "remove-participant",
    MEETING_LOCKED: "meeting-locked",
    MEETING_UNLOCKED: "meeting-unlocked",
    CHAT_DISABLED: "chat-disabled",
    CHAT_ENABLED: "chat-enabled",
    SCREEN_SHARE_PERMISSION: "screen-share-permission",
    RECORDING_PERMISSION: "recording-permission",

    // WebRTC Signaling (Phase 4.2)
    JOIN_ROOM: "join-room",
    LEAVE_ROOM: "leave-room",
    OFFER: "offer",
    ANSWER: "answer",
    ICE_CANDIDATE: "ice-candidate",
    PEER_CONNECTED: "peer-connected",
    PEER_DISCONNECTED: "peer-disconnected",
    ROOM_JOINED: "room-joined",
    ROOM_PEERS: "room-peers",

    // Room Management (Phase 4.3)
    ROOM_CREATE: "room:create",
    ROOM_JOIN: "room:join",
    ROOM_LEAVE: "room:leave",
    ROOM_LOCK: "room:lock",
    ROOM_UNLOCK: "room:unlock",
    ROOM_REMOVE_USER: "room:remove-user",
    ROOM_END_MEETING: "room:end-meeting",

    // Room Management Responses
    ROOM_CREATED: "room-created",
    ROOM_USER_JOINED: "user-joined", // Re-using legacy for compatibility? Backend uses user-joined for both
    ROOM_USER_LEFT: "user-left",
    ROOM_LOCKED: "room-locked",
    ROOM_UNLOCKED: "room-unlocked",
    ROOM_ENDED: "room-ended",
    ROOM_ERROR: "room-error",

    // Presence (Phase 4.4)
    PRESENCE_ONLINE: "presence:online",
    PRESENCE_UPDATE: "presence:update",
    PRESENCE_GET: "presence:get",
    PRESENCE_HEARTBEAT: "presence:heartbeat",
    PRESENCE_OFFLINE: "presence:offline",

    USER_ONLINE: "user-online",
    USER_OFFLINE: "user-offline",
    USER_PRESENCE_UPDATE: "user-presence-update",
    PRESENCE_STATE: "presence:state",

    // Chat (Phase 4.5)
    CHAT_SEND_MESSAGE: "chat:send-message",
    CHAT_PRIVATE_MESSAGE: "chat:private-message",
    CHAT_HISTORY: "chat:history",
    CHAT_READ: "chat:read",
    CHAT_DELETE: "chat:delete",

    CHAT_NEW_MESSAGE: "chat:new-message",
    CHAT_MESSAGE_READ: "chat:message-read",
    CHAT_MESSAGE_DELETED: "chat:message-deleted",
    CHAT_HISTORY_RESPONSE: "chat:history-response",
    CHAT_ERROR: "chat:error",
});