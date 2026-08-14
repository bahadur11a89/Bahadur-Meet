import React from 'react';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import styles from './StateDisplay.module.css';

const StateDisplay = ({
    icon,
    title,
    description,
    primaryAction,
    secondaryAction,
}) => {
    return (
        <Paper variant="outlined" className={styles.statePaper}>
            <Box className={styles.iconWrapper}>{icon}</Box>
            <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
                {description}
            </Typography>
            {(primaryAction || secondaryAction) && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    {secondaryAction && (
                        <Button variant="text" color="secondary" onClick={secondaryAction.onClick}>
                            {secondaryAction.text}
                        </Button>
                    )}
                    {primaryAction && (
                        <Button variant="contained" onClick={primaryAction.onClick}>
                            {primaryAction.text}
                        </Button>
                    )}
                </Stack>
            )}
        </Paper>
    );
};

export default StateDisplay;