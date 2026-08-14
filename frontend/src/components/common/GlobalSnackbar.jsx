import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const GlobalSnackbar = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={props => <Slide {...props} direction="up" />}
        >
            <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalSnackbar;
