import React from 'react';
import { Box, Grid, Typography, Paper, Chip } from '@mui/material';
import styles from './MonthCalendar.module.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Placeholder data for a 31-day month starting on a Tuesday (index 2)
const monthData = {
  startDay: 2,
  days: 31,
  events: {
    10: [{ title: 'Project Standup', color: 'primary' }],
    15: [{ title: 'Team Outing', color: 'success' }],
    25: [{ title: 'Holiday', color: 'error' }, { title: 'Design Review', color: 'secondary' }],
  },
  today: 26,
};

const MonthCalendar = () => {
  const dayCells = Array.from({ length: monthData.startDay + monthData.days }, (_, i) => {
    if (i < monthData.startDay) return null; // Empty cells before month starts
    const day = i - monthData.startDay + 1;
    const isToday = day === monthData.today;
    const isWeekend = (i % 7 === 0) || (i % 7 === 6);

    return (
      <Grid item xs={1} key={i} className={styles.dayCell}>
        <Paper variant="outlined" className={`${styles.dayPaper} ${isWeekend ? styles.weekend : ''}`}>
          <Typography variant="caption" className={`${styles.dayNumber} ${isToday ? styles.today : ''}`}>
            {day}
          </Typography>
          <Box className={styles.eventsContainer}>
            {(monthData.events[day] || []).map((event, idx) => (
              <Chip key={idx} label={event.title} size="small" color={event.color} className={styles.eventChip} />
            ))}
          </Box>
        </Paper>
      </Grid>
    );
  });

  return (
    <Box className={styles.calendarContainer}>
      <Grid container columns={7} className={styles.headerGrid}>
        {daysOfWeek.map(day => <Grid item xs={1} key={day}><Typography variant="subtitle2" align="center">{day}</Typography></Grid>)}
      </Grid>
      <Grid container columns={7} className={styles.bodyGrid}>{dayCells}</Grid>
    </Box>
  );
};

export default MonthCalendar;