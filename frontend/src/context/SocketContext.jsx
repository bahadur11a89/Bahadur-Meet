import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { createSocketConnection } from '../socket/socket';
import { SOCKET_EVENTS } from '../services/eventRegistry';
import { SessionManager } from '../services/sessionManager';
import { ListenerManager } from '../services/listenerManager';
import { EventQueue } from '../services/eventQueue';
import { MeetingStateManager } from '../services/meetingStateManager';
import { MeetingEventManager } from '../services/meetingEventManager';
import { useAuth } from './AuthContext';

import { SocketHealthMonitor } from '../utils/socketHealth';
import { SocketDebugger } from '../utils/socketDebugger';

const emitSafe = (socket, event, payload) => {
    if (socket && socket.connected) {
        socket.emit(event, payload);
    }
};

const PRESENCE_STATES = {
    OFFLINE: 'offline',
    ONLINE: 'online',
    AWAY: 'away',
};
const PRESENCE_EVENTS = {};

const SocketContext = createContext(null);

const INITIAL_MEETING_STATE = {
    title: '',
    isLocked: false,
    participants: [],
    hostId: null,
};

/**
 * @typedef {'initializing' | 'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'authentication_failed' | 'offline' | 'error'} ConnectionState
 */

/**
 * @typedef {'idle' | 'joining' | 'joined' | 'leaving' | 'failed'} MeetingStatus
 */

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connectionState, setConnectionState] = useState('initializing');
    const [isOnline, setIsOnline] = useState(() => navigator.onLine);
    const [socketHealth, setSocketHealth] = useState({
        latency: -1, lastHeartbeat: null, connectionDuration: 0, transport: 'N/A', socketId: null,
    });
    const [presence, setPresence] = useState({
        state: PRESENCE_STATES.OFFLINE,
        isTabVisible: document.visibilityState === 'visible',
    });
    const [session, setSession] = useState({
        socketId: null, sessionId: null, connectionTimestamp: null, lastActivityTimestamp: null, reconnectCount: 0,
    });
    const [currentMeetingId, setCurrentMeetingId] = useState(null);
    const [meetingStatus, setMeetingStatus] = useState('idle');
    const [meetingState, setMeetingState] = useState(INITIAL_MEETING_STATE);

    // Managers will be stored in state to ensure they persist across re-renders
    const [managers, setManagers] = useState(null);

    const { isAuthenticated } = useAuth();

    const connect = useCallback(() => {
        if (socket) {
            console.log('[SOCKET.IO] Attempting to connect...');
            socket.connect();
        }
    }, [socket]);

    const disconnect = useCallback(() => {
        if (socket) {
            console.log('[SOCKET.IO] Disconnecting...');
            socket.disconnect();
        }
    }, [socket]);

    const joinMeeting = useCallback((meetingId) => {
        if (!socket || !socket.connected) {
            console.error('[Socket.IO] Cannot join meeting. Socket not connected.');
            setMeetingStatus('failed');
            return;
        }
        if (currentMeetingId === meetingId && meetingStatus === 'joined') {
            console.warn(`[Socket.IO] Already in meeting ${meetingId}.`);
            return;
        }
        console.log(`[Socket.IO] Joining meeting: ${meetingId}`);
        setMeetingStatus('joining');
        setCurrentMeetingId(meetingId);
        managers.eventQueue.enqueue(SOCKET_EVENTS.JOIN_CALL, meetingId); // backend expects string
    }, [socket, currentMeetingId, meetingStatus, managers]);

    const leaveMeeting = useCallback(() => {
        if (socket && currentMeetingId) {
            emitSafe(socket, SOCKET_EVENTS.LEAVE_ROOM, { meetingId: currentMeetingId });
            setCurrentMeetingId(null);
            setMeetingStatus('idle');
            setMeetingState(INITIAL_MEETING_STATE); // Reset meeting state on leave
        }
    }, [socket, currentMeetingId]);

    const removeParticipant = useCallback((participantId) => {
        if (socket && currentMeetingId) {
            managers.eventQueue.enqueue(SOCKET_EVENTS.REMOVE_PARTICIPANT, { meetingId: currentMeetingId, participantId });
        }
    }, [socket, currentMeetingId, managers]);

    const transferHost = useCallback((participantId) => {
        if (socket && currentMeetingId) {
            managers.eventQueue.enqueue(SOCKET_EVENTS.TRANSFER_HOST, { meetingId: currentMeetingId, newHostId: participantId });
        }
    }, [socket, currentMeetingId, managers]);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        const handleVisibilityChange = () => {
            setPresence(p => ({ ...p, isTabVisible: document.visibilityState === 'visible' }));
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        let currentSocket = null;
        if (isAuthenticated) {
            const token = localStorage.getItem('token') || localStorage.getItem('authToken');
            if (token) {
                currentSocket = createSocketConnection(token);
                setSocket(currentSocket);
                setManagers({
                    listeners: new ListenerManager(currentSocket),
                    debugger: new SocketDebugger(currentSocket),
                    eventQueue: new EventQueue(currentSocket),
                });
            }
        } else {
            setSocket(null);
            setManagers(null);
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            if (currentSocket) {
                currentSocket.disconnect();
            }
        };
    }, [isAuthenticated]); // This effect only manages the existence of the socket instance.

    useEffect(() => {
        if (!socket) {
            setConnectionState(isOnline ? 'disconnected' : 'offline');
            return;
        }

        const healthMonitor = new SocketHealthMonitor(socket, setSocketHealth);
        healthMonitor.start();

        const sessionManager = new SessionManager(socket, setSession);
        sessionManager.start();

        const meetingStateManager = new MeetingStateManager(setMeetingState);
        const meetingEventManager = new MeetingEventManager(managers.listeners, meetingStateManager);
        meetingEventManager.registerAll();

        // Start the debugger in development
        managers.debugger.start();

        // Manage connection based on network status
        if (isOnline) {
            if (!socket.connected) {
                setConnectionState('connecting');
                connect();
            }
        } else {
            setConnectionState('offline');
            disconnect();
        }

        const onConnect = () => {
            setConnectionState('connected');
            setPresence(p => ({ ...p, state: PRESENCE_STATES.ONLINE }));
            // Flush any queued events upon successful connection
            managers.eventQueue.flush();
            // Auto-rejoin logic for meetings
            if (currentMeetingId) {
                console.log(`[Socket.IO] Re-joining meeting ${currentMeetingId} after reconnect.`);
                // We don't call joinMeeting() directly to avoid state transitions like 'joining'
                emitSafe(socket, SOCKET_EVENTS.JOIN_CALL, currentMeetingId); // backend expects string
            }
            // Announce presence to the server
            socket.emit(SOCKET_EVENTS.PRESENCE_UPDATE, { state: PRESENCE_STATES.ONLINE });
        };
        const onDisconnect = (reason) => {
            // Only update state if not manually disconnected while going offline
            if (isOnline && reason !== 'io client disconnect') {
                setConnectionState('disconnected');
                setMeetingState(prev => ({ ...prev, participants: [], hostId: null })); // Clear participants on disconnect
            }
            setPresence(p => ({ ...p, state: PRESENCE_STATES.OFFLINE }));
        };
        const onReconnectAttempt = () => setConnectionState('reconnecting');
        const onConnectError = (err) => {
            console.error('[SOCKET.IO] Connection Error:', err.message);
            // Assuming backend sends a specific message for auth errors
            if (err.message.includes('Authentication error')) {
                setConnectionState('authentication_failed');
            } else {
                setConnectionState('error');
            }
        };
        const onReconnectFailed = () => setConnectionState('error');

        const onJoinSuccess = (data) => {
            console.log('[Socket.IO] Successfully joined meeting:', data.meetingId);
            if (data.meetingId === currentMeetingId) {
                setMeetingStatus('joined');
            }
        };
        const onJoinFailed = (data) => {
            console.error('[Socket.IO] Failed to join meeting:', data.meetingId, 'Reason:', data.reason);
            if (data.meetingId === currentMeetingId) {
                setMeetingStatus('failed');
                setCurrentMeetingId(null);
            }
        };

        const onMeetingEnded = ({ meetingId, reason }) => {
            if (meetingId === currentMeetingId) {
                console.log(`[Socket.IO] Meeting ${meetingId} ended by server. Reason: ${reason}`);
                setCurrentMeetingId(null);
                setMeetingStatus('idle');
                setMeetingState(INITIAL_MEETING_STATE);
            }
        };

        managers.listeners.subscribe(SOCKET_EVENTS.CONNECT, onConnect);
        managers.listeners.subscribe(SOCKET_EVENTS.DISCONNECT, onDisconnect);
        managers.listeners.subscribe(SOCKET_EVENTS.CONNECT_ERROR, onConnectError);
        managers.listeners.subscribe(SOCKET_EVENTS.RECONNECT_ATTEMPT, onReconnectAttempt);
        managers.listeners.subscribe(SOCKET_EVENTS.RECONNECT_FAILED, onReconnectFailed);
        managers.listeners.subscribe(SOCKET_EVENTS.MEETING_JOIN_SUCCESS, onJoinSuccess);
        managers.listeners.subscribe(SOCKET_EVENTS.MEETING_JOIN_FAILED, onJoinFailed);
        managers.listeners.subscribe(SOCKET_EVENTS.MEETING_ENDED, onMeetingEnded);
        // All other meeting events are now handled by MeetingEventManager

        return () => {
            healthMonitor.stop();
            sessionManager.stop();
            managers.debugger.stop();
            // Use the listener manager to clean up all listeners at once
            managers.listeners.cleanup();
        };
    }, [socket, managers, isOnline, connect, disconnect, currentMeetingId]); // MeetingEventManager handles its own listeners

    const value = useMemo(() => ({
        // State
        connectionState,
        socketHealth,
        presence,
        session,
        isOnline,
        isConnected: connectionState === 'connected',
        currentMeetingId,
        meetingStatus,
        meetingState,

        // Actions
        connect, // Manual connect
        disconnect, // Manual disconnect
        joinMeeting,
        leaveMeeting,
        removeParticipant,
        transferHost,

        // Safe interaction methods
        emit: (event, ...args) => emitSafe(socket, event, ...args),
        subscribe: (event, handler) => managers?.listeners.subscribe(event, handler) || (() => {}),
        unsubscribe: (event, handler) => managers?.listeners.unsubscribe(event, handler),

    }), [connectionState, socketHealth, presence, session, isOnline, connect, disconnect, socket, managers, currentMeetingId, meetingStatus, meetingState, joinMeeting, leaveMeeting, removeParticipant, transferHost]);

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export default SocketContext;