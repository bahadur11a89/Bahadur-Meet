import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Stack, Button } from '@mui/material';
import NotificationCard from './NotificationCard';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MovieIcon from '@mui/icons-material/Movie';

const demoNotifications = [
  { title: 'Meeting Reminder', description: 'Project Phoenix Standup starts in 15 minutes.', timestamp: '2m ago', priority: 'High', unread: true, icon: <EventIcon /> },
  { title: 'Invitation Accepted', description: 'Alice accepted your invitation for "Q4 Strategy".', timestamp: '1h ago', priority: 'Low', unread: true, icon: <CheckCircleIcon /> },
  { title: 'Recording Ready', description: 'Your recording for "Design Review" is now available.', timestamp: '3h ago', priority: 'Medium', unread: false, icon: <MovieIcon /> },
];

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Notifications</Typography>
        <Button size="small">Mark all as read</Button>
      </Stack>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="All" />
        <Tab label="Meetings" />
        <Tab label="Invitations" />
        <Tab label="System" />
      </Tabs>
      <Stack>
        {demoNotifications.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </Stack>
    </Box>
  );
};

export default NotificationCenter;