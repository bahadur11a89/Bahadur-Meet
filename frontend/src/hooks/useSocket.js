import { useContext } from 'react';
import SocketContext from '../context/SocketContext';

/**
 * The primary hook for interacting with the application's Socket.IO connection.
 * It provides a safe and managed API for emitting events, subscribing to listeners,
 * and accessing connection state.
 */
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error('useSocket must be used within a SocketProvider');
    return context;
};