import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Stack, Avatar } from '@mui/material';
import RSVPStatusChip from './RSVPStatusChip';

const rsvpStats = [
  { title: 'Accepted', value: 12 },
  { title: 'Pending', value: 5 },
  { title: 'Declined', value: 2 },
  { title: 'Maybe', value: 1 },
];

const rsvpList = [
  { name: 'Alice', status: 'Accepted', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Bob', status: 'Pending', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Charlie', status: 'Declined', avatar: '/static/images/avatar/3.jpg' },
];

const RSVPDashboard = () => {
  return (
    <Box sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>RSVP Status</Typography>
      <Grid container spacing={2}>
        {rsvpStats.map((stat) => (
          <Grid item key={stat.title} xs={6} sm={3}>
            <Card variant="outlined" sx={{ textAlign: 'center', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stat.value}</Typography>
                <RSVPStatusChip status={stat.title} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>Responses</Typography>
      <Stack spacing={1}>
        {rsvpList.map((rsvp, index) => (
          <Stack key={index} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar src={rsvp.avatar} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{rsvp.name}</Typography>
            </Stack>
            <RSVPStatusChip status={rsvp.status} />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default RSVPDashboard;