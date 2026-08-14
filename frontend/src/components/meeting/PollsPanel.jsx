import React, { useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PollCard from '../PollCard/PollCard';
import CreatePollDialog from '../CreatePollDialog/CreatePollDialog';
import styles from './PollsPanel.module.css';

const demoPolls = [
  { question: 'What should be our next feature focus?', status: 'Active', options: [{ text: 'Mobile App Redesign', votes: 12 }, { text: 'API Integrations', votes: 8 }] },
  { question: 'Best day for the team outing?', status: 'Closed', options: [{ text: 'Friday', votes: 15 }, { text: 'Saturday', votes: 5 }] },
];

const PollsPanel = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Stack className={styles.panelContainer}>
        <Box className={styles.panelHeader}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Polls</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>Create</Button>
        </Box>
        <Stack className={styles.listContainer}>
          {demoPolls.map((poll, index) => (
            <PollCard key={index} poll={poll} />
          ))}
        </Stack>
      </Stack>
      <CreatePollDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default PollsPanel;