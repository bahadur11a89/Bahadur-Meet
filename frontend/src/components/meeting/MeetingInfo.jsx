import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const InfoRow = ({ label, value }) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body1" color="text.secondary">{label}</Typography>
    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{value}</Typography>
  </Stack>
);

const MeetingInfo = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Meeting Information
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          <InfoRow label="Meeting Name" value="Project Phoenix Standup" />
          <InfoRow label="Meeting ID" value="812 456 7890" />
          <InfoRow label="Host" value="Alice Johnson" />
          <InfoRow label="Start Time" value="10:00 AM" />
          <InfoRow label="Password" value="••••••" />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button fullWidth variant="contained" startIcon={<ContentCopyIcon />}>Copy Invite Link</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MeetingInfo;