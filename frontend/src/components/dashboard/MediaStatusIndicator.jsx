import React from 'react';
import { Stack, Chip } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { useMediaControls } from '../../../hooks/useMediaControls';

const MediaStatusIndicator = () => {
    const { cameraEnabled, microphoneEnabled } = useMediaControls();

    return (
        <Stack direction="row" spacing={1}>
            <Chip
                icon={cameraEnabled ? <CheckCircle /> : <Error />}
                label={cameraEnabled ? 'Camera On' : 'Camera Off'}
                color={cameraEnabled ? 'success' : 'default'}
                variant="outlined"
                size="small"
            />
            <Chip
                icon={microphoneEnabled ? <CheckCircle /> : <Error />}
                label={microphoneEnabled ? 'Mic On' : 'Mic Muted'}
                color={microphoneEnabled ? 'success' : 'default'}
                variant="outlined"
                size="small"
            />
        </Stack>
    );
};

export default MediaStatusIndicator;