/**
 * Manages the comprehensive state of a meeting.
 * This class centralizes state update logic, making the React context cleaner.
 */
export class MeetingStateManager {
    constructor(setMeetingState) {
        this.setMeetingState = setMeetingState;
    }

    /**
     * Handles the full participant list from the server.
     * @param {{ participants: Array<object>, hostId: string }} data
     */
    handleParticipantsList({ participants, hostId }) {
        this.setMeetingState(prev => ({ ...prev, participants, hostId }));
    }

    /**
     * Adds a new participant to the list.
     * @param {object} participant The new participant object.
     */
    handleParticipantJoined(participant) {
        this.setMeetingState(prev => ({
            ...prev,
            participants: [...prev.participants.filter(p => p.id !== participant.id), participant],
        }));
    }

    /**
     * Removes a participant from the list.
     * @param {{ participantId: string }} data
     */
    handleParticipantLeft({ participantId }) {
        this.setMeetingState(prev => ({
            ...prev,
            participants: prev.participants.filter(p => p.id !== participantId),
        }));
    }

    /**
     * Updates the host of the meeting.
     * @param {{ newHostId: string }} data
     */
    handleHostChanged({ newHostId }) {
        this.setMeetingState(prev => ({ ...prev, hostId: newHostId }));
    }

    /**
     * Handles a generic state update for the meeting.
     * @param {object} meetingUpdate An object with properties to update (e.g., { title, isLocked }).
     */
    handleMeetingStateUpdate(meetingUpdate) {
        this.setMeetingState(prev => ({ ...prev, ...meetingUpdate }));
    }
}