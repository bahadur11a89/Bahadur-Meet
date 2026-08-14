import React from 'react';
import { Card, CardContent, Typography, Stack, Button, AvatarGroup, Avatar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styles from './BreakoutRoomCard.module.css';

const BreakoutRoomCard = ({ room }) => {
  return (
    <Card variant="outlined" className={styles.roomCard}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>{room.name}</Typography>
        <Stack spacing={1} mb={2}>
          <Typography variant="body2" color="text.secondary" className={styles.infoItem}>
            <PeopleIcon fontSize="small" sx={{ mr: 1 }} /> {room.participants} Participants
          </Typography>
          <Typography variant="body2" color="text.secondary" className={styles.infoItem}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} /> In progress: {room.time}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <AvatarGroup max={3}>
            <Avatar sx={{ width: 24, height: 24 }} />
            <Avatar sx={{ width: 24, height: 24 }} />
            <Avatar sx={{ width: 24, height: 24 }} />
          </AvatarGroup>
          <Button size="small" variant="contained">Join</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BreakoutRoomCard;