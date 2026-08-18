import { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { SOCKET_EVENTS } from '../services/eventRegistry';
import { useMedia } from '../context/MediaContext';

const peerConfig = {
    iceServers: [
        { urls: process.env.REACT_APP_STUN_SERVER || "stun:stun.l.google.com:19302" },
        ...(process.env.REACT_APP_TURN_SERVER ? [{
            urls: process.env.REACT_APP_TURN_SERVER,
            username: process.env.REACT_APP_TURN_USERNAME || "",
            credential: process.env.REACT_APP_TURN_CREDENTIAL || ""
        }] : [])
    ]
};

const useWebRTC = (meetingId) => {
    const { socketHealth, isConnected, emit, subscribe, unsubscribe } = useSocket();
    const { localStream } = useMedia();
    
    // Store peers as objects: { userId, socketId, stream }
    const [peers, setPeers] = useState([]); 
    const peerConnections = useRef({}); // map of targetUserId -> RTCPeerConnection

    // Helper to add local stream to a connection
    const addLocalTracks = (pc) => {
        if (localStream) {
            localStream.getTracks().forEach(track => {
                // Ensure we don't add the same track twice
                if (!pc.getSenders().find(s => s.track === track)) {
                    pc.addTrack(track, localStream);
                }
            });
        }
    };

    // Helper to create a new peer connection
    const createPeerConnection = useCallback((targetUserId, targetSocketId) => {
        if (peerConnections.current[targetUserId]) {
            return peerConnections.current[targetUserId];
        }

        const pc = new RTCPeerConnection(peerConfig);
        pc.targetUserId = targetUserId;
        peerConnections.current[targetUserId] = pc;

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                emit(SOCKET_EVENTS.ICE_CANDIDATE, { meetingId, targetUserId, candidate: event.candidate });
            }
        };

        pc.ontrack = (event) => {
            const remoteStream = event.streams[0];
            setPeers(prev => {
                const existing = prev.find(p => p.userId === targetUserId);
                if (existing) {
                    return prev.map(p => p.userId === targetUserId ? { ...p, stream: remoteStream } : p);
                }
                return [...prev, { userId: targetUserId, socketId: targetSocketId, stream: remoteStream }];
            });
        };

        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
                emit(SOCKET_EVENTS.PEER_CONNECTED, { meetingId, targetUserId });
            }
        };

        return pc;
    }, [emit, meetingId]);

    useEffect(() => {
        if (!isConnected || !meetingId) return;

        console.log(`[WebRTC] Joining signaling room: ${meetingId}`);
        emit(SOCKET_EVENTS.JOIN_ROOM, { meetingId });

        const handleRoomJoined = async ({ peers: existingPeers }) => {
            console.log('[WebRTC] Room joined. Existing peers:', existingPeers);
            setPeers(existingPeers.map(p => ({ userId: p.userId, socketId: p.socketId, stream: null })));
            for (const peer of existingPeers) {
                const pc = createPeerConnection(peer.userId, peer.socketId);
                addLocalTracks(pc);
                
                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    emit(SOCKET_EVENTS.OFFER, { meetingId, targetUserId: peer.userId, offer });
                } catch (e) {
                    console.error('[WebRTC] Error creating offer:', e);
                }
            }
        };

        // When a new peer joins, we just wait for their offer.
        // We do NOT initiate an offer here to avoid collisions.
        const handlePeerConnected = ({ userId, socketId }) => {
            console.log('[WebRTC] New peer arrived, waiting for offer:', userId);
            setPeers(prev => {
                if (prev.find(p => p.userId === userId)) return prev;
                return [...prev, { userId, socketId, stream: null }];
            });
        };

        const handleOffer = async ({ fromUserId, fromSocketId, offer }) => {
            console.log(`[WebRTC] Received offer from ${fromUserId}`);
            const pc = createPeerConnection(fromUserId, fromSocketId);
            addLocalTracks(pc);

            try {
                await pc.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                emit(SOCKET_EVENTS.ANSWER, { meetingId, targetUserId: fromUserId, answer });
            } catch (e) {
                console.error('[WebRTC] Error handling offer:', e);
            }
        };

        const handleAnswer = async ({ fromUserId, answer }) => {
            console.log(`[WebRTC] Received answer from ${fromUserId}`);
            const pc = peerConnections.current[fromUserId];
            if (pc) {
                try {
                    await pc.setRemoteDescription(new RTCSessionDescription(answer));
                } catch (e) {
                    console.error('[WebRTC] Error setting remote description from answer:', e);
                }
            }
        };

        const handleIceCandidate = async ({ fromUserId, candidate }) => {
            const pc = peerConnections.current[fromUserId];
            if (pc && candidate) {
                try {
                    await pc.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (e) {
                    console.error('[WebRTC] Error adding ICE candidate:', e);
                }
            }
        };

        const handlePeerDisconnected = ({ userId }) => {
            console.log(`[WebRTC] Peer disconnected: ${userId}`);
            if (peerConnections.current[userId]) {
                peerConnections.current[userId].close();
                delete peerConnections.current[userId];
            }
            setPeers(prev => prev.filter(p => p.userId !== userId));
        };

        subscribe(SOCKET_EVENTS.ROOM_JOINED, handleRoomJoined);
        subscribe(SOCKET_EVENTS.PEER_CONNECTED, handlePeerConnected);
        subscribe(SOCKET_EVENTS.OFFER, handleOffer);
        subscribe(SOCKET_EVENTS.ANSWER, handleAnswer);
        subscribe(SOCKET_EVENTS.ICE_CANDIDATE, handleIceCandidate);
        subscribe(SOCKET_EVENTS.PEER_DISCONNECTED, handlePeerDisconnected);

        return () => {
            console.log(`[WebRTC] Leaving signaling room: ${meetingId}`);
            emit(SOCKET_EVENTS.LEAVE_ROOM, { meetingId });
            
            unsubscribe(SOCKET_EVENTS.ROOM_JOINED, handleRoomJoined);
            unsubscribe(SOCKET_EVENTS.PEER_CONNECTED, handlePeerConnected);
            unsubscribe(SOCKET_EVENTS.OFFER, handleOffer);
            unsubscribe(SOCKET_EVENTS.ANSWER, handleAnswer);
            unsubscribe(SOCKET_EVENTS.ICE_CANDIDATE, handleIceCandidate);
            unsubscribe(SOCKET_EVENTS.PEER_DISCONNECTED, handlePeerDisconnected);

            // Cleanup all peer connections
            Object.values(peerConnections.current).forEach(pc => pc.close());
            peerConnections.current = {};
            setPeers([]);
        };
    }, [isConnected, meetingId, emit, subscribe, unsubscribe, createPeerConnection]);

    // Renegotiate when localStream changes (e.g. toggling video/audio devices)
    useEffect(() => {
        Object.values(peerConnections.current).forEach(async (pc) => {
            if (localStream) {
                const senders = pc.getSenders();
                localStream.getTracks().forEach(track => {
                    const sender = senders.find(s => s.track && s.track.kind === track.kind);
                    if (sender && sender.track !== track) {
                        sender.replaceTrack(track);
                    } else if (!sender) {
                        pc.addTrack(track, localStream);
                    }
                });
                
                // Renegotiation needs a new offer
                try {
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    if(pc.targetUserId) {
                        emit(SOCKET_EVENTS.OFFER, { meetingId, targetUserId: pc.targetUserId, offer });
                    }
                } catch(e) {
                    console.error('[WebRTC] Error during stream renegotiation:', e);
                }
            }
        });
    }, [localStream, emit, meetingId]);

    return { peers };
};

export default useWebRTC;