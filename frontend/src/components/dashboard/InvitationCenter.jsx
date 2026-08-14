import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Stack } from '@mui/material';
import InvitationCard from './InvitationCard';

const demoInvitations = [
  { title: 'Q4 Marketing Strategy', organizer: 'David', date: 'Oct 26', time: '11:30 AM', status: 'Pending' },
  { title: 'Design Review', organizer: 'Charlie', date: 'Oct 25', time: '4:00 PM', status: 'Accepted' },
];

const InvitationCenter = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Invitations</Typography>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Pending" />
        <Tab label="Accepted" />
        <Tab label="Declined" />
        <Tab label="Expired" />
      </Tabs>
      <Stack spacing={2}>
        {demoInvitations.map((invitation, index) => (
          <InvitationCard key={index} invitation={invitation} />
        ))}
      </Stack>
    </Box>
  );
};

export default InvitationCenter;