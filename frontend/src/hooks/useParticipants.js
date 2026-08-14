import { useSocket } from './useSocket';
import { useAuth } from '../context/AuthContext';

/**
 * A specialized hook for components that need to interact with the meeting's participant list and host controls.
 * It derives state from the main `useSocket` and `useAuth` hooks.
 *
 * @returns {{
 *  participants: Array<object>,
 *  participantCount: number,
 *  hostId: string | null,
 *  isHost: boolean,
 *  removeParticipant: (participantId: string) => void,
 *  transferHost: (participantId: string) => void
 * }}
 */
export const useParticipants = () => {
    const { user } = useAuth();
    const { participants, hostId, removeParticipant, transferHost } = useSocket();

    return {
        participants,
        participantCount: participants.length,
        hostId,
        isHost: user?.id === hostId,
        removeParticipant,
        transferHost,
    };
};