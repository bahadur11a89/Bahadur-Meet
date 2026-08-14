import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import styles from './WeekCalendar.module.css';

const timeSlots = Array.from({ length: 14 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const WeekCalendar = () => {
  return (
    <Box className={styles.weekContainer}>
      <Grid container>
        <Grid item className={styles.timeColumn} /> {/* Spacer for time column */}
        {days.map(day => (
          <Grid item key={day} className={styles.dayHeader}>
            <Typography variant="subtitle2" align="center">{day}</Typography>
          </Grid>
        ))}
      </Grid>
      <Box className={styles.scheduleArea}>
        <Box className={styles.timeColumn}>
          {timeSlots.map(time => <Typography key={time} variant="caption" className={styles.timeLabel}>{time}</Typography>)}
        </Box>
        <Grid container className={styles.daysContainer}>
          {days.map(day => (
            <Grid item key={day} className={styles.dayColumn}>
              {/* Event Placeholder */}
              {day === 'Mon' && (
                <Paper className={styles.eventBlock} sx={{ top: '8.33%', height: '12.5%' }}>
                  <Typography variant="caption" fontWeight="bold">Project Standup</Typography>
                  <Typography variant="caption">10:00 - 11:30</Typography>
                </Paper>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WeekCalendar;