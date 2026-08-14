import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert, Stack } from '@mui/material';
import { VideocamOff, CallEnd } from '@mui/icons-material';
import { useMeetings } from '../context/MeetingContext';
import ErrorState from '../components/common/states/ErrorState';

const MeetingRoomPage = () => {
    const { meetingId } = useParams();
    const navigate = useNavigate();
    const {
        currentMeeting,
        loadingMeetingDetails,
        meetingDetailsError,
        getMeetingDetails,
        endMeeting,
        endingMeeting,
        setCurrentMeeting // To clear state on unmount or end
    } = useMeetings();

    useEffect(() => {
        if (meetingId) {
            getMeetingDetails(meetingId);
        }
        // Cleanup current meeting state when component unmounts
        return () => setCurrentMeeting(null);
    }, [meetingId, getMeetingDetails, setCurrentMeeting]);

    const handleEndMeeting = async () => {
        if (meetingId) {
            try {
                await endMeeting(meetingId);
                navigate('/dashboard'); // Redirect after ending meeting
            } catch (error) {
                // Error handled by context
            }
        }
    };

    if (loadingMeetingDetails) {
        return <CircularProgress sx={{ m: 4 }} />;
    }

    if (meetingDetailsError) {
        return <ErrorState type="generic" onRetry={() => getMeetingDetails(meetingId)} />;
    }

    if (!currentMeeting) {
        return <Alert severity="info">Meeting not found or has ended.</Alert>;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>Meeting: {currentMeeting.title}</Typography>
            <Typography variant="body1">Description: {currentMeeting.description}</Typography>
            <Typography variant="body2">Meeting ID: {currentMeeting._id}</Typography>
            <Stack direction="row" spacing={2} mt={4}>
                <Button variant="contained" color="error" startIcon={<CallEnd />} onClick={handleEndMeeting} disabled={endingMeeting}>
                    {endingMeeting ? 'Ending...' : 'End Meeting'}
                </Button>
                <Button variant="outlined" startIcon={<VideocamOff />}>Leave Meeting</Button>
            </Stack>
        </Box>
    );
};

export default MeetingRoomPage;