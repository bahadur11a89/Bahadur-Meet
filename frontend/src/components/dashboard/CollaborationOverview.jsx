import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const overviewStats = [
  { title: 'Active Teams', value: '6' },
  { title: 'Online Members', value: '42' },
  { title: 'Open Tasks', value: '18' },
  { title: 'Shared Files', value: '256' },
  { title: 'Upcoming Meetings', value: '8' },
  { title: 'Announcements', value: '3' },
];

const CollaborationOverview = () => {
  return (
    <Box sx={{ p: 3, bgcolor: 'action.hover', borderRadius: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Overview</Typography>
      <Grid container spacing={2}>
        {overviewStats.map((stat, index) => (
          <Grid item key={index} xs={6} sm={4} md={2}>
            <Card variant="outlined" sx={{ textAlign: 'center', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CollaborationOverview;