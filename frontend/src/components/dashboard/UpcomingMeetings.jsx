import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import MeetingCard from '../MeetingCard/MeetingCard';

const demoMeetings = [
  {
    id: '812 456 7890',
    title: 'Project Phoenix Standup',
    host: { name: 'Alice Johnson', avatar: '/static/images/avatar/1.jpg' },
    date: 'Oct 26, 2023',
    time: '10:00 AM',
    duration: '30 mins',
    participants: [
      { name: 'Bob', avatar: '/static/images/avatar/2.jpg' },
      { name: 'Charlie', avatar: '/static/images/avatar/3.jpg' },
    ],
    status: 'Live',
  },
  {
    id: '987 654 3210',
    title: 'Q4 Marketing Strategy',
    host: { name: 'David Chen', avatar: '/static/images/avatar/4.jpg' },
    date: 'Oct 26, 2023',
    time: '11:30 AM',
    duration: '1 hour',
    participants: [
      { name: 'Eve', avatar: '/static/images/avatar/5.jpg' },
      { name: 'Frank', avatar: '/static/images/avatar/6.jpg' },
      { name: 'Grace', avatar: '/static/images/avatar/7.jpg' },
      { name: 'Heidi', avatar: '/static/images/avatar/1.jpg' },
    ],
    status: 'Scheduled',
  },
  {
    id: '111 222 3333',
    title: 'Client Onboarding - Acme Corp',
    host: { name: 'Alice Johnson', avatar: '/static/images/avatar/1.jpg' },
    date: 'Oct 26, 2023',
    time: '2:00 PM',
    duration: '45 mins',
    participants: [{ name: 'Client', avatar: '/static/images/avatar/8.jpg' }],
    status: 'Scheduled',
  },
  {
    id: '444 555 6666',
    title: 'Design Review - Mobile App',
    host: { name: 'Charlie', avatar: '/static/images/avatar/3.jpg' },
    date: 'Oct 25, 2023',
    time: '4:00 PM',
    duration: '1 hour',
    participants: [{ name: 'Bob', avatar: '/static/images/avatar/2.jpg' }],
    status: 'Completed',
  },
];

const UpcomingMeetings = () => {
  return (
    <Box component="section" aria-labelledby="upcoming-meetings-title">
      <Typography variant="h5" component="h2" id="upcoming-meetings-title" sx={{ fontWeight: 'bold' }} gutterBottom>
        Upcoming Meetings
      </Typography>
      <Grid container spacing={3}>
        {demoMeetings.map((meeting, index) => (
          <Grid item xs={12} md={6} key={index}>
            <MeetingCard meeting={meeting} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingMeetings;