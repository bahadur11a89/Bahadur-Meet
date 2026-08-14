import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ReminderCard from './ReminderCard';

const demoReminders = [
  { title: 'Project Phoenix Standup', date: 'Today', time: '10:00 AM', type: '15 Min Before' },
  { title: 'Q4 Marketing Strategy', date: 'Today', time: '11:30 AM', type: '1 Hour Before' },
];

const ReminderPanel = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Reminders</Typography>
      <Stack spacing={2}>
        {demoReminders.map((reminder, index) => (
          <ReminderCard key={index} reminder={reminder} />
        ))}
      </Stack>
    </Box>
  );
};

export default ReminderPanel;