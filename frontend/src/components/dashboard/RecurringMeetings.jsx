import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import RecurringMeetingCard from './RecurringMeetingCard';
import RecurringMeetingDialog from './RecurringMeetingDialog';

const demoMeetings = [
  { title: 'Daily Standup', organizer: 'You', frequency: 'Daily', nextMeeting: 'Tomorrow, 9 AM', duration: '15 min' },
  { title: 'Weekly Sync', organizer: 'Alice', frequency: 'Weekly', nextMeeting: 'Nov 3, 10 AM', duration: '1 hour' },
  { title: 'Monthly All-Hands', organizer: 'HR Dept', frequency: 'Monthly', nextMeeting: 'Nov 15, 2 PM', duration: '1 hour' },
];

const RecurringMeetings = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Recurring Meetings</Typography>
        <Grid container spacing={3}>
          {demoMeetings.map((meeting, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}><RecurringMeetingCard meeting={meeting} onEdit={handleEdit} /></Grid>
          ))}
        </Grid>
      </Box>
      <RecurringMeetingDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default RecurringMeetings;