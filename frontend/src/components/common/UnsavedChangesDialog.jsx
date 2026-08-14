import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const UnsavedChangesDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoOutlined color="warning" sx={{ mr: 1 }} />
                Unsaved Changes
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You have unsaved changes. Are you sure you want to leave without saving?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Stay</Button>
                <Button onClick={onConfirm} color="warning" variant="contained">
                    Leave
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UnsavedChangesDialog;