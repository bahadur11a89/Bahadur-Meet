import React from 'react';
import { Card, CardContent, Typography, Stack, Chip, Avatar, IconButton, Tooltip, Box, Button } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './RecurringMeetingCard.module.css';

const frequencyColors = {
  Daily: 'primary',
  Weekly: 'secondary',
  Monthly: 'success',
  Yearly: 'info',
};

const RecurringMeetingCard = ({ meeting, onEdit }) => {
  return (
    <Card variant="outlined" className={styles.meetingCard}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Avatar variant="rounded" sx={{ bgcolor: 'action.hover' }}>
            <RepeatIcon color="primary" />
          </Avatar>
          <Stack direction="row" alignItems="center">
            <Chip label={meeting.frequency} color={frequencyColors[meeting.frequency]} size="small" />
            <Tooltip title="More options">
              <IconButton size="small"><MoreVertIcon /></IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }} noWrap>{meeting.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Organized by {meeting.organizer}
        </Typography>

        <Stack direction="row" spacing={2} my={2} color="text.secondary">
          <Box className={styles.infoItem}><EventRepeatIcon fontSize="small" /> <Typography ml={0.5} variant="body2">Next: {meeting.nextMeeting}</Typography></Box>
          <Box className={styles.infoItem}><AccessTimeIcon fontSize="small" /> <Typography ml={0.5} variant="body2">{meeting.duration}</Typography></Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
          <Avatar />
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" onClick={onEdit}>Edit</Button>
            <Button size="small" variant="contained">View</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecurringMeetingCard;