import React from 'react';
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MeetingForm = () => {
  return (
    <Stack spacing={3} mt={1}>
      <TextField label="Meeting Title" fullWidth variant="outlined" defaultValue="Project Sync" />
      <TextField label="Description" fullWidth multiline rows={3} variant="outlined" />
      <Stack direction="row" spacing={2}>
        <TextField label="Date" fullWidth variant="outlined" placeholder="Select Date" type="date" InputLabelProps={{ shrink: true }} />
        <TextField label="Time" fullWidth variant="outlined" placeholder="Select Time" type="time" InputLabelProps={{ shrink: true }} />
      </Stack>
      <FormControl fullWidth>
        <InputLabel>Duration</InputLabel>
        <Select label="Duration" defaultValue={60}>
          <MenuItem value={15}>15 minutes</MenuItem>
          <MenuItem value={30}>30 minutes</MenuItem>
          <MenuItem value={45}>45 minutes</MenuItem>
          <MenuItem value={60}>1 hour</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default MeetingForm;