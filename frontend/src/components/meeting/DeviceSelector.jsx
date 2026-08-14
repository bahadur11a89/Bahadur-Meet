import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack, Typography } from '@mui/material';
import { Videocam, Mic } from '@mui/icons-material';
import { useDevices } from '../../../hooks/useDevices';

const DeviceSelector = () => {
    const { availableDevices, selectedDevices, switchCamera, switchMicrophone } = useDevices();

    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <InputLabel id="camera-select-label">Camera</InputLabel>
                <Select
                    labelId="camera-select-label"
                    value={selectedDevices.video || ''}
                    label="Camera"
                    onChange={(e) => switchCamera(e.target.value)}
                    startAdornment={<Videocam sx={{ mr: 1, color: 'action.active' }} />}
                >
                    {availableDevices.videoInputs.map(device => (
                        <MenuItem key={device.deviceId} value={device.deviceId}>
                            {device.label || `Camera ${availableDevices.videoInputs.indexOf(device) + 1}`}
                        </MenuItem>
                    ))}
                    {availableDevices.videoInputs.length === 0 && <MenuItem disabled>No cameras found</MenuItem>}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="mic-select-label">Microphone</InputLabel>
                <Select
                    labelId="mic-select-label"
                    value={selectedDevices.audio || ''}
                    label="Microphone"
                    onChange={(e) => switchMicrophone(e.target.value)}
                    startAdornment={<Mic sx={{ mr: 1, color: 'action.active' }} />}
                >
                    {availableDevices.audioInputs.map(device => (
                        <MenuItem key={device.deviceId} value={device.deviceId}>
                            {device.label || `Microphone ${availableDevices.audioInputs.indexOf(device) + 1}`}
                        </MenuItem>
                    ))}
                    {availableDevices.audioInputs.length === 0 && <MenuItem disabled>No microphones found</MenuItem>}
                </Select>
            </FormControl>
        </Stack>
    );
};

export default DeviceSelector;