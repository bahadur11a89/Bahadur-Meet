import React from 'react';
import { Box, Typography, Stack, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GuestCard from './GuestCard';

const demoGuests = [
  { name: 'Alice Johnson', email: 'alice@example.com', status: 'Accepted', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Bob Williams', email: 'bob@example.com', status: 'Pending', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Charlie Brown', email: 'charlie@example.com', status: 'Declined', avatar: '/static/images/avatar/3.jpg' },
];

const GuestManager = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Guests</Typography>
        <Button variant="contained" startIcon={<PersonAddIcon />}>Invite</Button>
      </Stack>
      <TextField
        fullWidth
        size="small"
        placeholder="Search guests"
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ mb: 2 }}
      />
      <Stack spacing={1}>
        {demoGuests.map((guest, index) => <GuestCard key={index} guest={guest} />)}
      </Stack>
    </Box>
  );
};

export default GuestManager;