import React from 'react';
import { Box, Typography, Avatar, Stack, IconButton, Tooltip, Chip } from '@mui/material';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PanToolIcon from '@mui/icons-material/PanTool';
import styles from './ParticipantItem.module.css';

const ParticipantItem = ({ participant }) => {
  const { name, isHost, isCoHost, isMuted, isCameraOff, hasRaisedHand } = participant;
  const avatarChar = name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <Box className={styles.itemContainer}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
        <Avatar sx={{ width: 32, height: 32 }}>{avatarChar}</Avatar>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {name}
          {isHost && <Chip label="Host" size="small" color="primary" sx={{ ml: 1 }} />}
          {isCoHost && <Chip label="Co-host" size="small" color="info" sx={{ ml: 1 }} />}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {hasRaisedHand && (
          <Tooltip title="Hand Raised">
            <PanToolIcon color="primary" fontSize="small" />
          </Tooltip>
        )}
        <Tooltip title={isMuted ? 'Muted' : 'Unmuted'}>
          <IconButton size="small" disabled={!isMuted}>
            {isMuted ? <MicOffIcon fontSize="small" /> : <span />}
          </IconButton>
        </Tooltip>
        <Tooltip title={isCameraOff ? 'Video Off' : 'Video On'}>
          <IconButton size="small" disabled={!isCameraOff}>
            {isCameraOff ? <VideocamOffIcon fontSize="small" /> : <span />}
          </IconButton>
        </Tooltip>
        <Tooltip title="More options">
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default ParticipantItem;