import React from 'react';
import { Box, Typography, Stack, Button, Paper } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import styles from './MeetingNotes.module.css';

const MeetingNotes = () => {
  return (
    <Stack className={styles.panelContainer}>
      <Box className={styles.panelHeader}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Meeting Notes</Typography>
        <Button variant="outlined" size="small" startIcon={<IosShareIcon />}>Export</Button>
      </Box>
      <Box className={styles.notesEditor}>
        <Typography variant="h5" gutterBottom>Project Phoenix Standup</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>October 26, 2023</Typography>
        <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: '#3c3c3c', border: 'none' }}>
          <Typography sx={{ fontWeight: 'bold' }}>- Action Items</Typography>
          <Typography ml={2}>- [ ] Alice to draft API spec</Typography>
          <Typography ml={2}>- [x] Bob to review UI mockups</Typography>
        </Paper>
      </Box>
    </Stack>
  );
};

export default MeetingNotes;