import React, { useEffect } from 'react';
import { Box, Typography, Stack, Card, CardContent, Chip, Divider } from '@mui/material';
import { History, CalendarToday, AccessTime } from '@mui/icons-material';
import { useMeetings } from '../context/MeetingContext';
import DashboardSkeleton from '../components/common/skeletons/DashboardSkeleton'; // Reusing for loading state
import ErrorState from '../components/common/states/ErrorState';
import EmptyState from '../components/common/EmptyState';

const MeetingHistoryPage = () => {
    const { meetingHistory, loadingHistory, errorHistory, loadMeetingHistory } = useMeetings();

    useEffect(() => {
        loadMeetingHistory();
    }, [loadMeetingHistory]);

    if (loadingHistory) {
        return <DashboardSkeleton />; // Or a more specific skeleton
    }

    if (errorHistory) {
        return <ErrorState onRetry={loadMeetingHistory} />;
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Meeting History</Typography>

            {meetingHistory.length === 0 ? (
                <EmptyState
                    icon={<History />}
                    title="No Meeting History"
                    description="You haven't participated in any meetings yet."
                />
            ) : (
                <Stack spacing={2}>
                    {meetingHistory.map((meeting) => (
                        <Card key={meeting._id}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Box>
                                        <Typography variant="h6">{meeting.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{meeting.description}</Typography>
                                    </Box>
                                    <Chip label={meeting.duration || 'N/A'} size="small" icon={<AccessTime />} />
                                </Stack>
                                <Divider sx={{ my: 1 }} />
                                <Stack direction="row" spacing={1}>
                                    <Chip label={new Date(meeting.startTime).toLocaleString()} size="small" icon={<CalendarToday />} />
                                    <Chip label={meeting.participantsCount || 0 + ' participants'} size="small" />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default MeetingHistoryPage;