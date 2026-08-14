import React from 'react';
import { Box, Typography, TextField, InputAdornment, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ParticipantItem from './ParticipantItem';
import styles from './ParticipantsPanel.module.css';

const demoParticipants = [
  { name: 'Alice Johnson', isHost: true, isMuted: false, isCameraOff: false, isSpeaking: true, hasRaisedHand: false },
  { name: 'You', isHost: false, isMuted: false, isCameraOff: false, isSpeaking: false, hasRaisedHand: false },
  { name: 'Bob Williams', isHost: false, isMuted: true, isCameraOff: false, isSpeaking: false, hasRaisedHand: true },
  { name: 'Charlie Brown', isCoHost: true, isMuted: false, isCameraOff: true, isSpeaking: false, hasRaisedHand: false },
  { name: 'David Chen', isHost: false, isMuted: false, isCameraOff: false, isSpeaking: false, hasRaisedHand: false },
];

const ParticipantsPanel = () => {
  return (
    <Stack className={styles.panelContainer}>
      <Box className={styles.panelHeader}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Participants ({demoParticipants.length})
        </Typography>
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search participants"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Stack className={styles.participantList}>
        {demoParticipants.map((participant, index) => (
          <ParticipantItem key={index} participant={participant} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ParticipantsPanel;