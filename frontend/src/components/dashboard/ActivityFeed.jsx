import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ActivityCard from './ActivityCard';

const demoActivities = [
  { user: 'Alice', avatar: '/static/images/avatar/1.jpg', action: 'created a new poll: "Next Feature Focus"', timestamp: '10m ago', category: 'Poll' },
  { user: 'Bob', avatar: '/static/images/avatar/2.jpg', action: 'uploaded a document: "API_Spec_v2.docx"', timestamp: '1h ago', category: 'Document' },
  { user: 'Charlie', avatar: '/static/images/avatar/3.jpg', action: 'scheduled a meeting: "Design Review"', timestamp: '3h ago', category: 'Meeting' },
  { user: 'You', action: 'posted an announcement: "Q4 Holiday Schedule"', timestamp: 'Yesterday', category: 'Announcement' },
];

const ActivityFeed = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Recent Activity</Typography>
      <Stack spacing={2}>
        {demoActivities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </Stack>
    </Box>
  );
};

export default ActivityFeed;