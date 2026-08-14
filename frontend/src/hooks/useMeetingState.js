import { useSocket } from './useSocket';

/**
 * A specialized hook for components that only need to read the synchronized state of the current meeting.
 * This provides a clean, read-only API, separating display logic from action logic.
 *
 * @returns {{
 *  meetingId: string | null,
 *  meetingStatus: 'idle' | 'joining' | 'joined' | 'leaving' | 'failed',
 *  isInMeeting: boolean,
 *  meetingState: object,
 *  participants: Array<object>,
 *  hostId: string | null
 * }}
 */
export const useMeetingState = () => {
    const { currentMeetingId, meetingStatus, meetingState } = useSocket();
    const { participants, hostId, ...restOfState } = meetingState;
    return { meetingId: currentMeetingId, meetingStatus, isInMeeting: meetingStatus === 'joined', meetingState: restOfState, participants, hostId };
};