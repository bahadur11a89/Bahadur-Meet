/**
 * Constants for presence states.
 */
export const PRESENCE_STATES = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    AWAY: 'away',
    BUSY: 'busy',
    INVISIBLE: 'invisible',
};

/**
 * Constants for presence-related socket events.
 */
export const PRESENCE_EVENTS = {
    UPDATE_PRESENCE: 'presence:update',
    USER_ONLINE: 'presence:user_online',
    USER_OFFLINE: 'presence:user_offline',
};