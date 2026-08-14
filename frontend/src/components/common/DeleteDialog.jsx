import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { WarningAmber } from '@mui/icons-material';

const DeleteDialog = ({ open, onClose, onConfirm, title, description }) => {
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
            <DialogTitle id="delete-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningAmber color="error" sx={{ mr: 1 }} />
                {title || 'Confirm Deletion'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description || 'Are you sure you want to delete this item? This action cannot be undone.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;