import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import MeetingForm from './MeetingForm';
import MeetingTypeSelector from './MeetingTypeSelector';

const MeetingScheduler = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Schedule a Meeting</DialogTitle>
      <DialogContent>
        <MeetingTypeSelector />
        <Divider sx={{ my: 3 }} />
        <MeetingForm />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Save Meeting
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MeetingScheduler;