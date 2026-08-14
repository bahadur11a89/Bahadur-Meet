import React from 'react';
import { Grid, Card, CardActionArea, Typography, Stack } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RepeatIcon from '@mui/icons-material/Repeat';
import PersonIcon from '@mui/icons-material/Person';

const types = [
  { title: 'Scheduled Meeting', description: 'Plan a meeting for a future date and time.', icon: <ScheduleIcon /> },
  { title: 'Recurring Meeting', description: 'Set up a meeting that repeats.', icon: <RepeatIcon /> },
  { title: 'Personal Room', description: 'Use your personal meeting ID.', icon: <PersonIcon /> },
];

const MeetingTypeSelector = () => {
  return (
    <Grid container spacing={2}>
      {types.map((type, index) => (
        <Grid item key={index} xs={12} md={4}>
          <Card variant="outlined">
            <CardActionArea sx={{ p: 2, textAlign: 'center' }}>
              <Stack alignItems="center" spacing={1}>
                {type.icon}
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{type.title}</Typography>
                <Typography variant="caption" color="text.secondary">{type.description}</Typography>
              </Stack>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MeetingTypeSelector;