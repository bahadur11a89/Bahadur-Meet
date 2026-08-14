import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Button } from '@mui/material';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const focusSessions = [
  { title: 'Deep Work: API Design', duration: '90 min', status: 'Active' },
  { title: 'Planning Session', duration: '60 min', status: 'Upcoming' },
];

const FocusTime = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SelfImprovementIcon />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Focus Time</Typography>
        </Stack>
        <Button variant="contained">Create Session</Button>
      </Stack>
      <Stack spacing={2}>
        {focusSessions.map((session, index) => (
          <Card key={index} variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">{session.title}</Typography>
              <Typography color="text.secondary">{session.duration} • {session.status}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default FocusTime;