/**
 * Constants for meeting-related socket events.
 * These are consumed by the main eventRegistry.
 */
export const MEETING_EVENTS = {
    JOIN: 'meeting:join',
    LEAVE: 'meeting:leave',
    JOIN_SUCCESS: 'meeting:join_success',
    JOIN_FAILED: 'meeting:join_failed',

    // Participant Sync Events
    PARTICIPANTS_LIST: 'meeting:participants_list', // Server sends the full list
    PARTICIPANT_JOINED: 'meeting:participant_joined', // Server announces a new participant
    PARTICIPANT_LEFT: 'meeting:participant_left', // Server announces a participant left

    // Meeting State Sync Events
    MEETING_STATE_UPDATE: 'meeting:state_update', // Server broadcasts a change in meeting state (e.g., title, lock)
    MEETING_ENDED: 'meeting:ended', // Server announces the meeting has ended for all

    // Host Control Events
    REMOVE_PARTICIPANT: 'meeting:remove_participant', // Host sends to server
    PARTICIPANT_REMOVED: 'meeting:participant_removed', // Server announces removal (to all, including the one removed)
    TRANSFER_HOST: 'meeting:transfer_host', // Host sends to server
    HOST_CHANGED: 'meeting:host_changed', // Server announces new host
};