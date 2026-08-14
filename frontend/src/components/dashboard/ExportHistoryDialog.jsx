import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio, TextField, Stack } from '@mui/material';

const ExportHistoryDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Export Meeting History</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <RadioGroup defaultValue="csv">
            <FormControlLabel value="csv" control={<Radio />} label="Export as CSV" />
            <FormControlLabel value="xlsx" control={<Radio />} label="Export as Excel" />
            <FormControlLabel value="pdf" control={<Radio />} label="Export as PDF" />
          </RadioGroup>
          <TextField label="Date Range" fullWidth variant="outlined" placeholder="Select Date Range" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">Export</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportHistoryDialog;