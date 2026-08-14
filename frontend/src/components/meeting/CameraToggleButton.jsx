import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Videocam, VideocamOff } from '@mui/icons-material';
import { useMediaControls } from '../../../hooks/useMediaControls';

const CameraToggleButton = ({ size = 'large' }) => {
    const { cameraEnabled, toggleCamera } = useMediaControls();

    return (
        <Tooltip title={cameraEnabled ? 'Turn off camera' : 'Turn on camera'}>
            <IconButton
                onClick={toggleCamera}
                color={cameraEnabled ? 'primary' : 'default'}
                sx={{ bgcolor: cameraEnabled ? 'primary.light' : 'grey.300' }}
            >
                {cameraEnabled ? <Videocam /> : <VideocamOff />}
            </IconButton>
        </Tooltip>
    );
};

export default CameraToggleButton;