import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BreakoutRoomCard from './BreakoutRoomCard';
import styles from './BreakoutRooms.module.css';

const demoRooms = [
  { name: 'Team Alpha', participants: 3, host: 'Alice Johnson', time: '10:15' },
  { name: 'Design Crew', participants: 2, host: 'Charlie Brown', time: '05:30' },
];

const BreakoutRooms = () => {
  return (
    <Stack className={styles.panelContainer}>
      <Box className={styles.panelHeader}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Breakout Rooms</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Create Room</Button>
      </Box>
      <Stack className={styles.listContainer}>
        {demoRooms.map((room, index) => (
          <BreakoutRoomCard key={index} room={room} />
        ))}
      </Stack>
    </Stack>
  );
};

export default BreakoutRooms;