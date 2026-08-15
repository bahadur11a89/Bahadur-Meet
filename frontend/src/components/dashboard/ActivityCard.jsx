import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import styles from './ActivityCard.module.css';

const categoryColors = {
  Meeting: 'primary',
  Document: 'secondary',
  Task: 'info',
  Poll: 'success',
  Announcement: 'warning',
};

const ActivityCard = ({ activity }) => {
  const { user, avatar, action, timestamp, category } = activity;

  return (
    <Box className={styles.activityCard}>
      <Avatar src={avatar} sx={{ width: 32, height: 32, mr: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2">
          <Typography component="span" fontWeight="bold">{user}</Typography> {action}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {timestamp}
        </Typography>
      </Box>
      <Chip
        label={category}
        size="small"
        color={categoryColors[category] || 'default'}
        variant="outlined"
      />
    </Box>
  );
};

export default ActivityCard;