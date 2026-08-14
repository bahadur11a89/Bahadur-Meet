import React from 'react';
import { Card, Box, Typography, Avatar, Chip, Badge, Tooltip, IconButton } from '@mui/material';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import PushPinIcon from '@mui/icons-material/PushPin';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import styles from './VideoTile.module.css';

const VideoTile = React.memo(({ participant }) => {
  const { name, isHost, isMuted, isCameraOff, isSpeaking } = participant;
  const avatarChar = name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <Card className={`${styles.videoTile} ${isSpeaking ? styles.speaking : ''}`}>
      <Avatar sx={{ width: '40%', height: '40%', fontSize: '3rem' }}>{avatarChar}</Avatar>

      <Box className={styles.topIcons}>
        <Tooltip title="Network Quality: Good">
          <SignalCellularAltIcon fontSize="small" color="success" />
        </Tooltip>
        <Tooltip title="Pin Video">
          <IconButton size="small" sx={{ color: 'white' }}>
            <PushPinIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box className={styles.bottomInfo}>
        <Typography variant="body2" className={styles.nameTag}>
          {name}
        </Typography>
        <Box className={styles.statusIcons}>
          {isHost && <Chip label="Host" size="small" color="primary" sx={{ mr: 0.5 }} />}
          {isMuted && (
            <Badge color="error" variant="dot" sx={{ mr: 1.5 }}>
              <MicOffIcon fontSize="small" />
            </Badge>
          )}
          {isCameraOff && (
            <Badge color="error" variant="dot">
              <VideocamOffIcon fontSize="small" />
            </Badge>
          )}
        </Box>
      </Box>
    </Card>
  );
});

export default VideoTile;