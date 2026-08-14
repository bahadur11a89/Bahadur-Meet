import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import styles from './DayCalendar.module.css';

const timeSlots = Array.from({ length: 14 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

const DayCalendar = () => {
  return (
    <Box className={styles.dayContainer}>
      <Box className={styles.scheduleArea}>
        <Box className={styles.timeColumn}>
          {timeSlots.map(time => <Typography key={time} variant="caption" className={styles.timeLabel}>{time}</Typography>)}
        </Box>
        <Grid container className={styles.dayColumn}>
          {/* Current Time Indicator Placeholder */}
          <Box className={styles.currentTimeIndicator} sx={{ top: '10%' }} />

          {/* Event Placeholders */}
          <Paper className={styles.eventBlock} sx={{ top: '8.33%', height: '12.5%' }}>
            <Typography variant="body2" fontWeight="bold">Project Standup</Typography>
            <Typography variant="caption">10:00 AM - 11:30 AM</Typography>
          </Paper>
          <Paper className={styles.eventBlock} sx={{ top: '25%', height: '8.33%', bgcolor: 'secondary.light' }}>
            <Typography variant="body2" fontWeight="bold">Q4 Marketing Strategy</Typography>
            <Typography variant="caption">12:00 PM - 1:00 PM</Typography>
          </Paper>
        </Grid>
      </Box>
    </Box>
  );
};

export default DayCalendar;