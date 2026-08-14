import React from 'react';
import { Box, Typography, Stack, Avatar, IconButton, Tooltip } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import styles from './RaiseHandPanel.module.css';

const raisedHands = [
  { name: 'Bob Williams', time: '2m ago' },
  { name: 'Eve Davis', time: '1m ago' },
];

const RaiseHandPanel = () => {
  return (
    <Stack className={styles.panelContainer}>
      <Box className={styles.panelHeader}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Raised Hands ({raisedHands.length})
        </Typography>
      </Box>
      <Stack className={styles.listContainer}>
        {raisedHands.map((user, index) => (
          <Box key={index} className={styles.userItem}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography className={styles.queueNumber}>{index + 1}</Typography>
              <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{user.name}</Typography>
                <Typography variant="caption" color="text.secondary">{user.time}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <Tooltip title="Allow to Speak"><IconButton size="small"><MicIcon /></IconButton></Tooltip>
              <Tooltip title="Lower Hand"><IconButton size="small"><DoNotDisturbOnIcon /></IconButton></Tooltip>
              <Tooltip title="Remove"><IconButton size="small" color="error"><RemoveCircleOutlineIcon /></IconButton></Tooltip>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default RaiseHandPanel;