import React from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <Paper elevation={0} className={styles.heroCard} role="region" aria-label="Welcome and main actions">
      <Box sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ mb: { xs: 4, md: 0 }, mr: { md: 4 }, flexGrow: 1, zIndex: 1 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'white' }}>
            Good Morning 👋
          </Typography>
          <Typography variant="h5" component="p" sx={{ color: 'white', mb: 2 }}>
            Welcome back.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4, maxWidth: '500px' }}>
            Start or join meetings and collaborate with your team securely.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap">
            <Button variant="contained" startIcon={<VideoCallIcon />} sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f0f0f0' } }}>
              New Meeting
            </Button>
            <Button variant="outlined" startIcon={<MeetingRoomIcon />} sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
              Join Meeting
            </Button>
            <Button variant="outlined" startIcon={<CalendarMonthIcon />} sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
              Schedule
            </Button>
            <Button variant="outlined" startIcon={<ScreenShareIcon />} sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
              Share Screen
            </Button>
          </Stack>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', width: 250, height: 250 }} aria-hidden="true">
          <Box className={`${styles.shape} ${styles.shape1}`}><VideoCallIcon fontSize="large" sx={{ color: 'white' }} /></Box>
          <Box className={`${styles.shape} ${styles.shape2}`}><GroupsIcon fontSize="large" sx={{ color: 'white' }} /></Box>
          <Box className={`${styles.shape} ${styles.shape3}`}><AnalyticsIcon fontSize="large" sx={{ color: 'white' }} /></Box>
          <Box className={`${styles.shape} ${styles.shape4}`}><AccessTimeIcon fontSize="large" sx={{ color: 'white' }} /></Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default HeroSection;