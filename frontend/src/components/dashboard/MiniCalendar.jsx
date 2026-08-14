import React, { useState } from 'react';
import { Box, Typography, IconButton, Grid, Stack, Paper, Badge, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './MiniCalendar.module.css';

const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const meetingDates = [10, 15, 26]; // Demo dates with meetings

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
  };

  const today = new Date();

  return (
    <Paper variant="outlined" className={styles.calendarContainer}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {monthName} {year}
        </Typography>
        <Stack direction="row">
          <IconButton onClick={handlePrevMonth} size="small" aria-label="Previous month">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextMonth} size="small" aria-label="Next month">
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container columns={7} className={styles.calendarGrid}>
          {daysOfWeek.map((day) => (
            <Grid item xs={1} key={day} className={styles.dayOfWeek}>
              <Typography variant="caption" color="text.secondary">{day}</Typography>
            </Grid>
          ))}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <Grid item xs={1} key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, day) => {
            const dayNumber = day + 1;
            const isToday = dayNumber === today.getDate() && currentDate.getMonth() === today.getMonth() && year === today.getFullYear();
            const hasMeeting = meetingDates.includes(dayNumber);
            return (
              <Grid item xs={1} key={dayNumber} className={styles.dayCell}>
                <IconButton size="small" className={`${styles.dayButton} ${isToday ? styles.today : ''}`}>
                  <Badge
                    variant="dot"
                    color="primary"
                    invisible={!hasMeeting}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  >
                    <Typography variant="body2">{dayNumber}</Typography>
                  </Badge>
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Upcoming Events</Typography>
        <Stack spacing={1.5}>
          <Box className={styles.eventItem}>
            <Box className={styles.eventColor} sx={{ bgcolor: 'primary.main' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Q4 Marketing Strategy</Typography>
              <Typography variant="caption" color="text.secondary">11:30 AM</Typography>
            </Box>
          </Box>
          <Box className={styles.eventItem}>
            <Box className={styles.eventColor} sx={{ bgcolor: 'secondary.main' }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Client Onboarding</Typography>
              <Typography variant="caption" color="text.secondary">2:00 PM</Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default MiniCalendar;