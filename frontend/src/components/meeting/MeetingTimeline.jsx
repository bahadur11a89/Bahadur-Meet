import React from 'react';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import styles from './MeetingTimeline.module.css';

const timelineEvents = [
  { time: '10:00 AM', text: 'Meeting Started', icon: <PlayArrowIcon /> },
  { time: '10:02 AM', text: 'Bob joined', icon: <PersonAddIcon /> },
  { time: '10:15 AM', text: 'Alice started screen sharing', icon: <ScreenShareIcon /> },
  { time: '10:30 AM', text: 'Meeting Ended', icon: <StopIcon /> },
];

const MeetingTimeline = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Timeline</Typography>
      <div className={styles.timeline}>
        {timelineEvents.map((event, index) => (
          <div key={index} className={styles.timelineItem}>
            <div className={styles.timelineSeparator}>
              <Avatar className={styles.timelineDot} sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>{event.icon}</Avatar>
              {index < timelineEvents.length - 1 && <div className={styles.timelineConnector} />}
            </div>
            <div className={styles.timelineContent}>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{event.text}</Typography>
              <Typography variant="caption" color="text.secondary">{event.time}</Typography>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default MeetingTimeline;