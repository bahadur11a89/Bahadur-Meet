import React from 'react';
import { Box, Typography, Paper, Stack, Avatar, Badge, Divider, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './NotificationsPanel.module.css';

const demoNotifications = [
  { icon: <VideoCallIcon />, color: 'error.main', title: 'Meeting starts in 10 minutes', time: '2m ago', unread: true },
  { icon: <CheckCircleIcon />, color: 'success.main', title: 'Recording for "Q3 Review" is ready', time: '1h ago', unread: true },
  { icon: <PersonAddIcon />, color: 'primary.main', title: 'John Doe invited you to "Project Alpha"', time: '3h ago', unread: false },
  { icon: <AssessmentIcon />, color: 'info.main', title: 'Your weekly activity report is available', time: '1d ago', unread: false },
  { icon: <PersonAddIcon />, color: 'secondary.main', title: 'Jane Smith joined your team', time: '2d ago', unread: false },
  { icon: <CancelIcon />, color: 'warning.main', title: 'Meeting "1-on-1" was cancelled', time: '3d ago', unread: false },
];

const NotificationsPanel = () => {
  return (
    <Paper variant="outlined" className={styles.panelContainer}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <NotificationsIcon color="action" />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Notifications
          </Typography>
        </Stack>
        <IconButton size="small" aria-label="More options">
          <MoreVertIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack spacing={0} divider={<Divider />}>
        {demoNotifications.map((notif, index) => (
          <Box key={index} className={styles.notificationItem}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Badge
                variant="dot"
                color="primary"
                invisible={!notif.unread}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              >
                <Avatar sx={{ bgcolor: notif.color, color: 'white' }}>
                  {notif.icon}
                </Avatar>
              </Badge>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {notif.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notif.time}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default NotificationsPanel;