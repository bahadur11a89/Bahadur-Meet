import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, IconButton, FormControlLabel, Switch } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreatePollDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a New Poll</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField label="Your Question" fullWidth variant="outlined" />
          <TextField label="Option 1" fullWidth variant="outlined" />
          <TextField label="Option 2" fullWidth variant="outlined" />
          <Button startIcon={<AddCircleOutlineIcon />}>Add Option</Button>
          <FormControlLabel control={<Switch />} label="Anonymous responses" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">Launch Poll</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePollDialog;