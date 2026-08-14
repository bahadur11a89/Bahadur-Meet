export const APP_NAME = "Bahadur Zoom";

export const API_VERSION = "v1";

export const DEFAULT_PORT = 8000;

export const DEFAULT_MEETING_CODE_LENGTH = 8;

export const USER_ROLES = {
    USER: "user",
    ADMIN: "admin",
    MODERATOR: "moderator",
};

export const MEETING_STATUS = {
    SCHEDULED: "scheduled",
    LIVE: "live",
    ENDED: "ended",
};

export const SOCKET_EVENTS = {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",

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
    ROOM_USER_JOINED: "user-joined",
    ROOM_USER_LEFT: "user-left",
    ROOM_LOCKED: "room-locked",
    ROOM_UNLOCKED: "room-unlocked",
    ROOM_ENDED: "room-ended",
    ROOM_ERROR: "room-error",

    // Presence (Phase 4.4) — inbound events
    PRESENCE_ONLINE: "presence:online",
    PRESENCE_UPDATE: "presence:update",
    PRESENCE_GET: "presence:get",
    PRESENCE_HEARTBEAT: "presence:heartbeat",
    PRESENCE_OFFLINE: "presence:offline",

    // Presence — outbound broadcasts
    USER_ONLINE: "user-online",
    USER_OFFLINE: "user-offline",
    USER_PRESENCE_UPDATE: "user-presence-update",
    PRESENCE_STATE: "presence:state",

    // Chat (Phase 4.5) — inbound
    CHAT_SEND_MESSAGE: "chat:send-message",
    CHAT_PRIVATE_MESSAGE: "chat:private-message",
    CHAT_HISTORY: "chat:history",
    CHAT_READ: "chat:read",
    CHAT_DELETE: "chat:delete",

    // Chat — outbound
    CHAT_NEW_MESSAGE: "chat:new-message",
    CHAT_MESSAGE_READ: "chat:message-read",
    CHAT_MESSAGE_DELETED: "chat:message-deleted",
    CHAT_HISTORY_RESPONSE: "chat:history-response",
    CHAT_ERROR: "chat:error",
};

export const INVITE_TOKEN_EXPIRY_HOURS = 24;

export const ROOM_STATUS = {
    ACTIVE: "active",
    ENDED: "ended",
};

export const MAX_PARTICIPANTS_DEFAULT = 100;

export const PRESENCE_STATUS = {
    ONLINE: "online",
    OFFLINE: "offline",
    IN_MEETING: "in_meeting",
    AWAY: "away",
};

// Heartbeat considered stale after this many ms with no ping
export const HEARTBEAT_TIMEOUT_MS = 60_000;

export const MESSAGE_TYPES = {
    TEXT:   "text",
    IMAGE:  "image",
    FILE:   "file",
    SYSTEM: "system",
};

export const CHAT_LIMITS = {
    MAX_MESSAGE_LENGTH: 2000,
    MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024, // 10 MB
    HISTORY_PAGE_SIZE:  50,
    HISTORY_MAX_LIMIT:  100,
};