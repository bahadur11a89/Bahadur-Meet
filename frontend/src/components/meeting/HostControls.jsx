import React from 'react';
import { MenuItem, ListItemIcon, Typography } from '@mui/material';
import { PersonRemove, SupervisorAccount } from '@mui/icons-material';

const HostControls = ({ participantId, onRemove, onTransferHost }) => {
    return (
        <>
            <MenuItem onClick={() => onTransferHost(participantId)}>
                <ListItemIcon><SupervisorAccount fontSize="small" /></ListItemIcon>
                <Typography variant="inherit">Make Host</Typography>
            </MenuItem>
            <MenuItem onClick={() => onRemove(participantId)} sx={{ color: 'error.main' }}>
                <ListItemIcon><PersonRemove fontSize="small" color="error" /></ListItemIcon>
                <Typography variant="inherit">Remove Participant</Typography>
            </MenuItem>
        </>
    );
};

export default HostControls;