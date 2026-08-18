import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Box, IconButton, Badge, TextField, Button, Grid, 
    Typography, Drawer, Stack, Paper, useMediaQuery, useTheme, CircularProgress
} from '@mui/material';
import { 
    Videocam, VideocamOff, Mic, MicOff, ScreenShare, StopScreenShare, 
    Chat as ChatIcon, CallEnd, Close, People
} from '@mui/icons-material';
import { useSocket } from '../context/SocketContext';
import { useMedia } from '../context/MediaContext';
import { useMeetings } from '../context/MeetingContext';
import useWebRTC from '../hooks/useWebRTC';
import { SOCKET_EVENTS } from '../services/eventRegistry';

export default function MeetingRoom() {
    const { id: routeMeetingId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Contexts
    const { 
        isConnected, connect, joinMeeting: socketJoinMeeting, leaveMeeting: socketLeaveMeeting,
        subscribe, unsubscribe, emit
    } = useSocket();
    
    const { 
        localStream, startMedia, stopMedia, cameraEnabled, microphoneEnabled, 
        toggleCamera, toggleMicrophone, isLoading: mediaLoading
    } = useMedia();

    const { 
        getMeetingDetails, currentMeeting, endMeeting
    } = useMeetings();

    // The actual meeting ID used for signaling
    const meetingId = currentMeeting?._id || routeMeetingId;
    
    // WebRTC hook
    const { peers } = useWebRTC(meetingId);

    // Local State
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasJoined, setHasJoined] = useState(false);
    const [username, setUsername] = useState('Guest');

    const localVideoRef = useRef();

    // 1. Initial Setup & Validation
    useEffect(() => {
        const initMeeting = async () => {
            try {
                // Connect socket if not connected
                if (!isConnected) {
                    connect();
                }
                
                // Fetch meeting details
                await getMeetingDetails(routeMeetingId);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load meeting:", err);
                setError("Failed to load meeting details. Please check the link and try again.");
                setLoading(false);
            }
        };
        initMeeting();
    }, [routeMeetingId, isConnected, connect, getMeetingDetails]);

    // 2. Attach Local Stream
    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream, hasJoined]); // Also re-run if hasJoined changes to attach to the new render

    // 3. Handle Chat Messages
    useEffect(() => {
        const handleChatMessage = (data, sender, socketIdSender) => {
            setMessages(prev => [...prev, { sender, data }]);
            if (!chatOpen) {
                setNewMessagesCount(prev => prev + 1);
            }
        };

        // If backend emits legacy 'chat-message', map it or just use CHAT_MESSAGE
        subscribe(SOCKET_EVENTS.CHAT_MESSAGE, handleChatMessage);
        return () => {
            unsubscribe(SOCKET_EVENTS.CHAT_MESSAGE, handleChatMessage);
        };
    }, [subscribe, unsubscribe, chatOpen]);

    // User Actions
    const handleJoinClick = async () => {
        await startMedia();
        socketJoinMeeting(meetingId);
        setHasJoined(true);
    };

    const handleLeaveClick = () => {
        socketLeaveMeeting();
        stopMedia();
        navigate('/');
    };

    const handleScreenShare = async () => {
        if (isScreenSharing) {
            // Stop screen share, revert to camera
            await startMedia(); // Resets to default camera/mic
            setIsScreenSharing(false);
        } else {
            try {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                
                // Keep audio from local stream if possible, or just replace video track
                if (localStream) {
                    const videoTrack = screenStream.getVideoTracks()[0];
                    const sender = localStream.getVideoTracks()[0];
                    if (sender) {
                        localStream.removeTrack(sender);
                    }
                    localStream.addTrack(videoTrack);
                    
                    videoTrack.onended = () => {
                        handleScreenShare(); // Revert on stop
                    };
                }
                setIsScreenSharing(true);
            } catch (err) {
                console.error("Screen sharing failed:", err);
            }
        }
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            emit(SOCKET_EVENTS.CHAT_MESSAGE, messageInput, username);
            setMessageInput('');
        }
    };

    const openChat = () => {
        setChatOpen(true);
        setNewMessagesCount(0);
    };

    // --- RENDER HELPERS ---
    const calculateGridCols = (totalVideos) => {
        if (totalVideos === 1) return 12; // 1 video = full width
        if (totalVideos === 2) return isMobile ? 12 : 6; // 2 videos = half width each
        if (totalVideos <= 4) return 6; // 3-4 videos = 2x2 grid
        return 4; // 5+ videos = 3x3 grid (mostly for desktop)
    };

    const totalVideos = peers.length + 1; // Peers + Local
    const gridCols = calculateGridCols(totalVideos);

    // --- PRE-JOIN / LOADING STATES ---
    if (loading) return <Box display="flex" height="100dvh" justifyContent="center" alignItems="center"><CircularProgress /></Box>;
    if (error) return <Box display="flex" height="100dvh" justifyContent="center" alignItems="center"><Typography color="error">{error}</Typography></Box>;

    if (!hasJoined) {
        return (
            <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
                <Paper sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 400, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" mb={2}>Ready to join?</Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>{currentMeeting?.title || "Meeting Room"}</Typography>
                    
                    <TextField 
                        fullWidth 
                        label="Your Name" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    
                    <Button 
                        variant="contained" 
                        size="large" 
                        fullWidth 
                        onClick={handleJoinClick}
                        disabled={mediaLoading}
                    >
                        {mediaLoading ? 'Initializing Media...' : 'Join Meeting'}
                    </Button>
                </Paper>
            </Box>
        );
    }

    // --- MAIN MEETING UI ---
    return (
        <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column', bgcolor: '#111827', overflow: 'hidden' }}>
            
            {/* TOP HEADER */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.5)', zIndex: 10 }}>
                <Typography variant="h6" color="white" fontWeight="bold">
                    {currentMeeting?.title || "Meeting"}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <People sx={{ color: 'white', fontSize: 20 }} />
                    <Typography color="white" fontWeight="bold">{peers.length + 1}</Typography>
                </Stack>
            </Box>

            {/* MAIN CONTENT AREA */}
            <Box sx={{ flexGrow: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
                
                {/* VIDEO GRID */}
                <Box sx={{ flexGrow: 1, p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'margin 0.3s' }}>
                    <Grid container spacing={2} sx={{ width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center' }}>
                        
                        {/* LOCAL VIDEO */}
                        <Grid item xs={gridCols} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '100%' }}>
                            <Box sx={{ position: 'relative', width: '100%', height: '100%', maxHeight: 'calc(100dvh - 160px)', borderRadius: 3, overflow: 'hidden', bgcolor: 'black' }}>
                                <video 
                                    ref={localVideoRef} 
                                    autoPlay 
                                    muted 
                                    playsInline 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isScreenSharing ? 'none' : 'scaleX(-1)' }} 
                                />
                                <Box sx={{ position: 'absolute', bottom: 10, left: 10, bgcolor: 'rgba(0,0,0,0.6)', px: 1, py: 0.5, borderRadius: 1 }}>
                                    <Typography color="white" variant="caption">You ({username})</Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* REMOTE PEERS */}
                        {peers.map(peer => (
                            <Grid item xs={gridCols} key={peer.userId} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '100%' }}>
                                <Box sx={{ position: 'relative', width: '100%', height: '100%', maxHeight: 'calc(100dvh - 160px)', borderRadius: 3, overflow: 'hidden', bgcolor: 'black' }}>
                                    <video 
                                        autoPlay 
                                        playsInline 
                                        ref={el => { if (el && peer.stream) el.srcObject = peer.stream; }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                    <Box sx={{ position: 'absolute', bottom: 10, left: 10, bgcolor: 'rgba(0,0,0,0.6)', px: 1, py: 0.5, borderRadius: 1 }}>
                                        <Typography color="white" variant="caption">Participant</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CHAT PANEL (Desktop/Tablet) */}
                {!isMobile && chatOpen && (
                    <Box sx={{ width: 320, bgcolor: 'background.paper', borderLeft: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
                            <Typography variant="h6" fontWeight="bold">Meeting Chat</Typography>
                            <IconButton onClick={() => setChatOpen(false)}><Close /></IconButton>
                        </Box>
                        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {messages.length === 0 ? (
                                <Typography color="text.secondary" textAlign="center" mt={4}>No messages yet.</Typography>
                            ) : (
                                messages.map((msg, i) => (
                                    <Box key={i}>
                                        <Typography variant="caption" fontWeight="bold" color="primary">{msg.sender}</Typography>
                                        <Typography variant="body2">{msg.data}</Typography>
                                    </Box>
                                ))
                            )}
                        </Box>
                        <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', gap: 1 }}>
                            <TextField 
                                size="small" 
                                fullWidth 
                                placeholder="Type a message..." 
                                value={messageInput}
                                onChange={e => setMessageInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button variant="contained" onClick={handleSendMessage}>Send</Button>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* MOBILE CHAT DRAWER */}
            {isMobile && (
                <Drawer anchor="bottom" open={chatOpen} onClose={() => setChatOpen(false)} PaperProps={{ sx: { height: '80dvh', borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e0e0e0' }}>
                        <Typography variant="h6" fontWeight="bold">Meeting Chat</Typography>
                        <IconButton onClick={() => setChatOpen(false)}><Close /></IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {messages.length === 0 ? (
                            <Typography color="text.secondary" textAlign="center" mt={4}>No messages yet.</Typography>
                        ) : (
                            messages.map((msg, i) => (
                                <Box key={i}>
                                    <Typography variant="caption" fontWeight="bold" color="primary">{msg.sender}</Typography>
                                    <Typography variant="body2">{msg.data}</Typography>
                                </Box>
                            ))
                        )}
                    </Box>
                    <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', gap: 1, pb: 'env(safe-area-inset-bottom, 16px)' }}>
                        <TextField 
                            size="small" 
                            fullWidth 
                            placeholder="Type a message..." 
                            value={messageInput}
                            onChange={e => setMessageInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button variant="contained" onClick={handleSendMessage}>Send</Button>
                    </Box>
                </Drawer>
            )}

            {/* BOTTOM CONTROLS TOOLBAR */}
            <Box sx={{ 
                p: 2, pb: isMobile ? 'calc(16px + env(safe-area-inset-bottom))' : 2,
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: { xs: 1, sm: 2 }, 
                bgcolor: 'rgba(0,0,0,0.8)', zIndex: 10
            }}>
                <IconButton 
                    onClick={toggleMicrophone} 
                    sx={{ bgcolor: microphoneEnabled ? 'rgba(255,255,255,0.1)' : 'error.main', color: 'white', '&:hover': { bgcolor: microphoneEnabled ? 'rgba(255,255,255,0.2)' : 'error.dark' }, width: {xs: 44, sm: 50}, height: {xs: 44, sm: 50} }}
                >
                    {microphoneEnabled ? <Mic /> : <MicOff />}
                </IconButton>
                <IconButton 
                    onClick={toggleCamera} 
                    sx={{ bgcolor: cameraEnabled ? 'rgba(255,255,255,0.1)' : 'error.main', color: 'white', '&:hover': { bgcolor: cameraEnabled ? 'rgba(255,255,255,0.2)' : 'error.dark' }, width: {xs: 44, sm: 50}, height: {xs: 44, sm: 50} }}
                >
                    {cameraEnabled ? <Videocam /> : <VideocamOff />}
                </IconButton>
                <IconButton 
                    onClick={handleScreenShare} 
                    sx={{ bgcolor: isScreenSharing ? 'primary.main' : 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: isScreenSharing ? 'primary.dark' : 'rgba(255,255,255,0.2)' }, width: {xs: 44, sm: 50}, height: {xs: 44, sm: 50} }}
                >
                    {isScreenSharing ? <StopScreenShare /> : <ScreenShare />}
                </IconButton>
                <Badge badgeContent={newMessagesCount} color="error">
                    <IconButton 
                        onClick={openChat} 
                        sx={{ bgcolor: chatOpen ? 'primary.main' : 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: chatOpen ? 'primary.dark' : 'rgba(255,255,255,0.2)' }, width: {xs: 44, sm: 50}, height: {xs: 44, sm: 50} }}
                    >
                        <ChatIcon />
                    </IconButton>
                </Badge>
                
                <Button 
                    variant="contained" 
                    color="error" 
                    onClick={handleLeaveClick}
                    sx={{ borderRadius: 8, px: { xs: 2, sm: 4 }, py: 1.5, fontWeight: 'bold' }}
                    startIcon={<CallEnd />}
                >
                    {isMobile ? '' : 'Leave'}
                </Button>
            </Box>
        </Box>
    );
}
