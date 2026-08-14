import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const RecurringMeetingDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Recurring Meeting</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField label="Meeting Title" fullWidth variant="outlined" defaultValue="Daily Standup" />
          <TextField label="Description" fullWidth multiline rows={3} variant="outlined" />
          <FormControl fullWidth>
            <InputLabel>Frequency</InputLabel>
            <Select label="Frequency" defaultValue="Daily">
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <TextField label="Start Date" fullWidth type="date" InputLabelProps={{ shrink: true }} />
            <TextField label="End Date" fullWidth type="date" InputLabelProps={{ shrink: true }} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField label="Time" fullWidth type="time" InputLabelProps={{ shrink: true }} />
            <TextField label="Timezone" fullWidth defaultValue="GMT-5 (EST)" />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecurringMeetingDialog;