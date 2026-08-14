import React from 'react';
import { Box, Typography, Avatar, Stack, Chip, IconButton, Tooltip, Badge } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import styles from './NotificationCard.module.css';

const priorityColors = {
  High: 'error',
  Medium: 'warning',
  Low: 'info',
};

const NotificationCard = ({ notification }) => {
  return (
    <Box className={`${styles.notificationCard} ${notification.unread ? styles.unread : ''}`}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
        <Badge
          color="primary"
          variant="dot"
          invisible={!notification.unread}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Avatar sx={{ bgcolor: 'action.hover' }}>
            {notification.icon || <NotificationsActiveIcon color="primary" />}
          </Avatar>
        </Badge>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{notification.title}</Typography>
          <Typography variant="body2" color="text.secondary">{notification.description}</Typography>
          <Typography variant="caption" color="text.secondary">{notification.timestamp}</Typography>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {notification.priority && (
          <Chip label={notification.priority} color={priorityColors[notification.priority]} size="small" />
        )}
        <Tooltip title="Dismiss">
          <IconButton size="small" aria-label="Dismiss notification">X</IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default NotificationCard;