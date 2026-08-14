import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, Chip, Grid } from '@mui/material';
import { Add, CalendarToday, Videocam } from '@mui/icons-material';
import { useMeetings } from '../context/MeetingContext';
import DashboardSkeleton from '../components/common/skeletons/DashboardSkeleton'; // Reusing for loading state
import ErrorState from '../components/common/states/ErrorState';
import EmptyState from '../components/common/EmptyState';
import CreateMeetingDialog from '../components/meetings/CreateMeetingDialog';

const ScheduledMeetingsPage = () => {
    const { scheduledMeetings, loadingScheduled, errorScheduled, loadScheduledMeetings, joinMeeting } = useMeetings();
    const [createMeetingDialogOpen, setCreateMeetingDialogOpen] = useState(false);

    useEffect(() => {
        loadScheduledMeetings();
    }, [loadScheduledMeetings]);

    const handleJoinMeeting = (meetingId) => {
        joinMeeting(meetingId); // This would typically navigate to the meeting room
    };

    if (loadingScheduled) {
        return <DashboardSkeleton />; // Or a more specific skeleton
    }

    if (errorScheduled) {
        return <ErrorState onRetry={loadScheduledMeetings} />;
    }

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Scheduled Meetings</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setCreateMeetingDialogOpen(true)}>
                    Schedule New Meeting
                </Button>
            </Stack>

            {scheduledMeetings.length === 0 ? (
                <EmptyState
                    icon={<CalendarToday />}
                    title="No Scheduled Meetings"
                    description="Looks like you don't have any upcoming meetings. Why not schedule one?"
                    primaryAction={{ text: 'Schedule Meeting', onClick: () => setCreateMeetingDialogOpen(true) }}
                />
            ) : (
                <Grid container spacing={3}>
                    {scheduledMeetings.map((meeting) => (
                        <Grid item xs={12} sm={6} md={4} key={meeting._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>{meeting.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" mb={1}>{meeting.description}</Typography>
                                    <Stack direction="row" spacing={1} mb={2}>
                                        <Chip label={new Date(meeting.startTime).toLocaleString()} size="small" icon={<CalendarToday />} />
                                        <Chip label={meeting.isPrivate ? 'Private' : 'Public'} size="small" />
                                    </Stack>
                                    <Button variant="contained" startIcon={<Videocam />} onClick={() => handleJoinMeeting(meeting._id)}>
                                        Join Meeting
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <CreateMeetingDialog open={createMeetingDialogOpen} onClose={() => setCreateMeetingDialogOpen(false)} />
        </Box>
    );
};

export default ScheduledMeetingsPage;