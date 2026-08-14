import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const FileSharePlaceholder = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Share a File</DialogTitle>
      <DialogContent>
        <Box sx={{ border: '2px dashed grey', borderRadius: 2, p: 4, textAlign: 'center', my: 2 }}>
          <Typography>Drag & drop a file here or</Typography>
          <Button variant="contained" sx={{ mt: 1 }}>
            Select from Computer
          </Button>
        </Box>
        <Typography variant="h6" sx={{ mt: 2 }}>Recent Files</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          [Placeholder for recent files list]
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" disabled>Share</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileSharePlaceholder;