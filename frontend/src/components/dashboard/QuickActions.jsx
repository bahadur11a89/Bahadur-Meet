import React from 'react';
import { Card, CardActionArea, CardContent, Grid, Typography, Avatar, Box } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import styles from './QuickActions.module.css';

const actions = [
  {
    title: 'New Meeting',
    description: 'Start an instant meeting.',
    icon: <VideoCallIcon fontSize="large" />,
    color: '#1e88e5', // Blue
  },
  {
    title: 'Join Meeting',
    description: 'Join using meeting ID.',
    icon: <MeetingRoomIcon fontSize="large" />,
    color: '#43a047', // Green
  },
  {
    title: 'Schedule',
    description: 'Plan meetings ahead.',
    icon: <CalendarMonthIcon fontSize="large" />,
    color: '#fb8c00', // Orange
  },
  {
    title: 'Share Screen',
    description: 'Present your screen instantly.',
    icon: <ScreenShareIcon fontSize="large" />,
    color: '#8e24aa', // Purple
  },
];

const QuickActions = () => {
  return (
    <Box component="section" aria-labelledby="quick-actions-title">
      <Typography variant="h5" component="h2" id="quick-actions-title" gutterBottom sx={{ fontWeight: 'bold' }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        {actions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card className={styles.actionCard} sx={{ height: '100%' }}>
              <CardActionArea
                aria-label={action.title}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Avatar sx={{ bgcolor: action.color, width: 64, height: 64, mb: 2, color: 'white' }}>
                  {action.icon}
                </Avatar>
                <CardContent sx={{ p: 0 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickActions;