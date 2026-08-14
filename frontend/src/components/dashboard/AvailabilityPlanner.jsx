import React from 'react';
import { Box, Typography, Stack, Button, Grid, Paper } from '@mui/material';
import styles from './AvailabilityPlanner.module.css';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeSlots = Array.from({ length: 9 }, (_, i) => `${i + 9}:00`);

const AvailabilityPlanner = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Availability</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Reset</Button>
          <Button variant="contained">Apply</Button>
        </Stack>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
        <Grid container className={styles.plannerGrid}>
          <Grid item className={styles.timeColumn} />
          {days.map(day => <Grid item key={day} className={styles.dayHeader}>{day}</Grid>)}

          {timeSlots.map(time => (
            <React.Fragment key={time}>
              <Grid item className={styles.timeColumn}>{time}</Grid>
              {days.map(day => (
                <Grid item key={`${day}-${time}`} className={styles.slot}>
                  {/* Placeholder for availability state */}
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default AvailabilityPlanner;