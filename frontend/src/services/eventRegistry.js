/**
 * A centralized, immutable registry of all Socket.IO event names used in the application.
 * Grouped by feature module for clarity and to prevent naming collisions.
 */
const MEETING_EVENTS = {
    MEETING_JOIN: 'join-call',
    MEETING_LEAVE: 'leave-room',
    REMOVE_PARTICIPANT: 'remove-participant',
};
export const SOCKET_EVENTS = Object.freeze({
    // --- Core Connection Events ---
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    CONNECT_ERROR: 'connect_error',
    RECONNECT_ATTEMPT: 'reconnect_attempt',
    RECONNECT: 'reconnect',
    RECONNECT_ERROR: 'reconnect_error',
    RECONNECT_FAILED: 'reconnect_failed',
    ERROR: 'error',

    // --- Authentication ---
    AUTHENTICATION_FAILED: 'authentication_failed', // Example custom server event

    // --- Presence ---
    UPDATE_PRESENCE: 'presence:update',
    USER_ONLINE: 'presence:user_online', // Example event from server
    USER_OFFLINE: 'presence:user_offline', // Example event from server

    // --- Meeting (Placeholders) ---
    ...MEETING_EVENTS,

    // --- Chat (Placeholders) ---
    CHAT_MESSAGE_NEW: 'chat:message_new',
    CHAT_TYPING_START: 'chat:typing_start',
    CHAT_TYPING_STOP: 'chat:typing_stop',

    // --- Notifications (Placeholders) ---
    NOTIFICATION_NEW: 'notification:new',

    // --- WebRTC (Placeholders) ---
    WEBRTC_SIGNAL: 'webrtc:signal',
    WEBRTC_OFFER: 'webrtc:offer',
    WEBRTC_ANSWER: 'webrtc:answer',
    WEBRTC_ICE_CANDIDATE: 'webrtc:ice_candidate',
});