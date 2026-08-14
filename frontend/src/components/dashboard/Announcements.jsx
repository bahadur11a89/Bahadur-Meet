import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import AnnouncementCard from './AnnouncementCard';

const demoAnnouncements = [
  { title: 'Q4 Holiday Schedule', description: 'Please note the upcoming company holidays for the end of the year.', author: 'HR Dept', date: 'Yesterday', priority: 'High', pinned: true },
  { title: 'New Feature Launch: Team Spaces', description: 'We are excited to launch the new Team Spaces feature next Monday!', author: 'Product Team', date: '2d ago', priority: 'Medium', pinned: false },
  { title: 'Server Maintenance', description: 'There will be a scheduled server maintenance this Saturday at 2 AM.', author: 'IT Dept', date: '4d ago', priority: 'Low', pinned: false },
];

const Announcements = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Team Announcements</Typography>
      <Stack spacing={2}>
        {demoAnnouncements.map((ann, index) => <AnnouncementCard key={index} announcement={ann} />)}
      </Stack>
    </Box>
  );
};

export default Announcements;