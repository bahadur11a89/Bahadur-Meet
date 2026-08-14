import { useContext } from 'react';
import SocketContext from '../context/SocketContext';

/**
 * Custom hook to access presence and session state from the SocketContext.
 */
export const usePresence = () => {
    const { presence, session } = useContext(SocketContext);
    // This hook is a selector for the SocketContext to provide a cleaner API
    // for components only interested in presence.
    return { presence, session };
};