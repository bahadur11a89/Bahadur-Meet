import React from 'react';
import { Card, CardContent, Typography, Stack, Chip, Button, Box } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import styles from './ReminderCard.module.css';

const ReminderCard = ({ reminder }) => {
  return (
    <Card variant="outlined" className={styles.reminderCard}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{reminder.title}</Typography>
          <Chip icon={<AlarmIcon />} label={reminder.type} size="small" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {reminder.date} at {reminder.time}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button size="small">Snooze</Button>
          <Button size="small" variant="outlined">Edit</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReminderCard;