import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MeetingTimeline from '../MeetingTimeline/MeetingTimeline';

const InfoRow = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body1" color="text.secondary">{label}</Typography>
    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{value}</Typography>
  </Stack>
);

const PlaceholderSection = ({ title }) => (
  <Box>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="caption" color="text.secondary">[{title} Placeholder]</Typography>
    </Box>
  </Box>
);

const MeetingDetailsDialog = ({ open, onClose, meeting }) => {
  if (!meeting) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {meeting.name}
        <IconButton edge="end" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>Details</Typography>
            <Stack spacing={1.5}>
              <InfoRow label="Meeting ID" value={meeting.id} />
              <InfoRow label="Host" value={meeting.host} />
              <InfoRow label="Participants" value={meeting.participants} />
              <InfoRow label="Duration" value={meeting.duration} />
            </Stack>
          </Box>
          <MeetingTimeline />
          <PlaceholderSection title="Recording & Transcript" />
          <PlaceholderSection title="Shared Files" />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained">Share</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MeetingDetailsDialog;