import React from 'react';
import { Card, CardContent, Typography, Stack, Chip, Avatar, IconButton, Tooltip, Box, Button } from '@mui/material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './MeetingHistoryCard.module.css';

const statusColors = {
  Completed: 'success',
  Scheduled: 'info',
  Cancelled: 'warning',
  Live: 'error',
};

const MeetingHistoryCard = React.memo(({ meeting, onViewDetails }) => {
  return (
    <Card variant="outlined" className={styles.meetingCard}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Avatar variant="rounded" sx={{ bgcolor: 'action.hover' }}>
            <VideocamOutlinedIcon color="primary" />
          </Avatar>
          <Tooltip title="Add to favorites">
            <IconButton size="small"><StarBorderOutlinedIcon /></IconButton>
          </Tooltip>
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 'bold' }} noWrap>{meeting.name}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {meeting.date} • {meeting.startTime}
        </Typography>

        <Stack direction="row" spacing={2} my={2}>
          <Box className={styles.infoItem}><PeopleOutlineIcon fontSize="small" /> <Typography ml={0.5} variant="body2" color="text.secondary">{meeting.participants} Participants</Typography></Box>
          <Box className={styles.infoItem}><AccessTimeIcon fontSize="small" /> <Typography ml={0.5} variant="body2" color="text.secondary">{meeting.duration}</Typography></Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Chip label={meeting.status} color={statusColors[meeting.status]} size="small" />
          <Tooltip title="View Details">
            <Button size="small" variant="text" onClick={onViewDetails}>View Details</Button>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
});

export default MeetingHistoryCard;