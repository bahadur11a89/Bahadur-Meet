import React from 'react';
import { Card, CardContent, Typography, Box, Button, Stack, Avatar, AvatarGroup, Tooltip, IconButton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StatusChip from '../common/StatusChip';
import styles from './MeetingCard.module.css';

const MeetingCard = React.memo(({ meeting, onDelete }) => {
  const { title, id, host, date, time, duration, participants, status } = meeting;

  return (
    <Card className={styles.meetingCard} variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ID: {id}
            </Typography>
          </Box>
          <StatusChip status={status} />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ my: 2 }} alignItems="center">
          <Tooltip title="Host">
            <Avatar alt={host.name} src={host.avatar} sx={{ width: 32, height: 32 }} />
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            Hosted by <strong>{host.name}</strong>
          </Typography>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary" className={styles.infoItem}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} /> {date} at {time}
          </Typography>
          <Typography variant="body2" color="text.secondary" className={styles.infoItem}>
            <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} /> {duration}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <AvatarGroup max={4}>
            {participants.map((p) => (
              <Tooltip key={p.name} title={p.name}>
                <Avatar alt={p.name} src={p.avatar} sx={{ width: 32, height: 32 }} />
              </Tooltip>
            ))}
          </AvatarGroup>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Delete Meeting">
              <IconButton size="small" onClick={onDelete} aria-label={`Delete meeting ${title}`}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
            <Button size="small" variant="outlined">Details</Button>
            <Button size="small" variant="contained" disabled={status !== 'Live'} sx={{ minWidth: '70px' }}>Join</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
});

export default MeetingCard;