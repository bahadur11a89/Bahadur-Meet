import React from 'react';
import { Box, Typography, Avatar, Stack, Chip, IconButton, Tooltip } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './GuestCard.module.css';

const statusColors = {
  Accepted: 'success',
  Pending: 'warning',
  Declined: 'error',
};

const GuestCard = ({ guest }) => {
  return (
    <Box className={styles.guestCard}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
        <Avatar src={guest.avatar} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{guest.name}</Typography>
          <Typography variant="body2" color="text.secondary">{guest.email}</Typography>
        </Box>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip label={guest.status} color={statusColors[guest.status]} size="small" />
        <Tooltip title="Resend Invite">
          <IconButton size="small"><MailOutlineIcon /></IconButton>
        </Tooltip>
        <Tooltip title="More options">
          <IconButton size="small"><MoreVertIcon /></IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default GuestCard;