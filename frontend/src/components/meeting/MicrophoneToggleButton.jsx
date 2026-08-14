import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';
import { useMediaControls } from '../../../hooks/useMediaControls';

const MicrophoneToggleButton = ({ size = 'large' }) => {
    const { microphoneEnabled, toggleMicrophone } = useMediaControls();

    return (
        <Tooltip title={microphoneEnabled ? 'Mute microphone' : 'Unmute microphone'}>
            <IconButton
                onClick={toggleMicrophone}
                color={microphoneEnabled ? 'primary' : 'default'}
                sx={{ bgcolor: microphoneEnabled ? 'primary.light' : 'grey.300' }}
            >
                {microphoneEnabled ? <Mic /> : <MicOff />}
            </IconButton>
        </Tooltip>
    );
};

export default MicrophoneToggleButton;