import { SOCKET_EVENTS } from './eventRegistry';

/**
 * Centralizes the registration and handling of all meeting-related socket events.
 */
export class MeetingEventManager {
    /**
     * @param {import('./listenerManager').ListenerManager} listenerManager
     * @param {import('./meetingStateManager').MeetingStateManager} stateManager
     */
    constructor(listenerManager, stateManager) {
        this.listenerManager = listenerManager;
        this.stateManager = stateManager;
        this.subscriptions = [];
    }

    /**
     * Registers all necessary event listeners for the meeting.
     */
    registerAll() {
        if (process.env.NODE_ENV === 'development') {
            console.log('[Socket.IO] MeetingEventManager: Registering all meeting event listeners.');
        }

        this.subscriptions.push(
            this.listenerManager.subscribe(SOCKET_EVENTS.PARTICIPANTS_LIST, (data) => this.stateManager.handleParticipantsList(data)),
            this.listenerManager.subscribe(SOCKET_EVENTS.PARTICIPANT_JOINED, (data) => this.stateManager.handleParticipantJoined(data)),
            this.listenerManager.subscribe(SOCKET_EVENTS.PARTICIPANT_LEFT, (data) => this.stateManager.handleParticipantLeft(data)),
            this.listenerManager.subscribe(SOCKET_EVENTS.HOST_CHANGED, (data) => this.stateManager.handleHostChanged(data)),
            this.listenerManager.subscribe(SOCKET_EVENTS.MEETING_STATE_UPDATE, (data) => this.stateManager.handleMeetingStateUpdate(data))
        );
    }

    /**
     * Unsubscribes from all registered events to prevent memory leaks.
     */
    cleanup() {
        if (process.env.NODE_ENV === 'development') {
            console.log('[Socket.IO] MeetingEventManager: Cleaning up all meeting event listeners.');
        }
        this.subscriptions.forEach(unsubscribe => unsubscribe());
        this.subscriptions = [];
    }
}