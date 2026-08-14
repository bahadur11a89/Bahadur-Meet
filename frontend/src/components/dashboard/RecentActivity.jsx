import React from 'react';
import { Box, Typography, Paper, Stack, Avatar, Chip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import styles from './RecentActivity.module.css';

const activities = [
  { icon: <AddCircleOutlineIcon />, color: 'primary.main', title: 'Meeting Created', description: 'You created "Project Phoenix Standup".', time: '10:00 AM', status: 'Success' },
  { icon: <LoginIcon />, color: 'success.main', title: 'Meeting Joined', description: 'You joined "Project Phoenix Standup".', time: '10:01 AM', status: 'Active' },
  { icon: <ScreenShareIcon />, color: 'info.main', title: 'Screen Shared', description: 'You started sharing your screen.', time: '10:05 AM', status: 'Info' },
  { icon: <ChatIcon />, color: 'secondary.main', title: 'Chat Message Sent', description: 'You sent a message in the chat.', time: '10:15 AM', status: 'Info' },
  { icon: <VideocamIcon />, color: 'warning.main', title: 'Recording Started', description: 'You started recording the meeting.', time: '10:20 AM', status: 'Processing' },
  { icon: <LogoutIcon />, color: 'error.main', title: 'Meeting Ended', description: 'The meeting "Project Phoenix Standup" has ended.', time: '10:31 AM', status: 'Completed' },
];

const RecentActivity = () => {
  return (
    <Paper variant="outlined" className={styles.activityContainer}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2 }}>
        <HistoryIcon color="action" />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Recent Activity
        </Typography>
      </Stack>
      <Box sx={{ p: 2 }}>
        <div className={styles.timeline}>
          {activities.map((activity, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                <Avatar sx={{ bgcolor: activity.color, width: 40, height: 40 }}>
                  {activity.icon}
                </Avatar>
              </div>
              <div className={styles.timelineContent}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={1}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {activity.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.description}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                     <Typography variant="caption" color="text.secondary" sx={{ minWidth: '60px', textAlign: 'right' }}>
                      {activity.time}
                    </Typography>
                    <Chip label={activity.status} size="small" />
                  </Stack>
                </Stack>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Paper>
  );
};

export default RecentActivity;