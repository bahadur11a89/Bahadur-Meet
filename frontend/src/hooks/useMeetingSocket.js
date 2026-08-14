import { useSocket } from './useSocket';

/**
 * A specialized hook for components that need to interact with the meeting room lifecycle.
 * It provides a focused API for joining, leaving, and monitoring meeting status.
 *
 * @returns {{
 *  joinMeeting: (meetingId: string) => void,
 *  leaveMeeting: () => void,
 *  meetingId: string | null,
 *  meetingStatus: 'idle' | 'joining' | 'joined' | 'leaving' | 'failed',
 *  isInMeeting: boolean
 * }}
 */
export const useMeetingSocket = () => {
    const { joinMeeting, leaveMeeting, currentMeetingId, meetingStatus, removeParticipant, transferHost } = useSocket();
    return { joinMeeting, leaveMeeting, meetingId: currentMeetingId, meetingStatus, isInMeeting: meetingStatus === 'joined', removeParticipant, transferHost };
};