import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    Grid,
    FormControl,
    InputLabel,
    Stack
} from '@mui/material';
import { Videocam, HighQuality } from '@mui/icons-material';
import VideoPreview from '../meeting/VideoPreview';
import styles from './VideoSettings.module.css';

const VideoSettings = () => {
    const [selectedCamera, setSelectedCamera] = useState('cam1');
    const [resolution, setResolution] = useState('1080p');

    return (
        <Box className={styles.container}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Video Settings
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <VideoPreview />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Card className={styles.card}>
                        <CardContent>
                            <Stack spacing={3}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Videocam color="primary" />
                                    <Typography variant="h6" component="div">Camera</Typography>
                                </Stack>
                                <FormControl fullWidth>
                                    <InputLabel id="camera-select-label">Camera Device</InputLabel>
                                    <Select
                                        labelId="camera-select-label"
                                        value={selectedCamera}
                                        label="Camera Device"
                                        onChange={(e) => setSelectedCamera(e.target.value)}
                                    >
                                        <MenuItem value="cam1">FaceTime HD Camera</MenuItem>
                                        <MenuItem value="cam2">Logitech C920</MenuItem>
                                        <MenuItem value="cam3">OBS Virtual Camera</MenuItem>
                                    </Select>
                                </FormControl>

                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <HighQuality color="primary" />
                                    <Typography variant="h6" component="div">Video Quality</Typography>
                                </Stack>
                                <FormControl fullWidth>
                                    <InputLabel id="resolution-select-label">Resolution</InputLabel>
                                    <Select
                                        labelId="resolution-select-label"
                                        value={resolution}
                                        label="Resolution"
                                        onChange={(e) => setResolution(e.target.value)}
                                    >
                                        <MenuItem value="1080p">Full HD (1080p)</MenuItem>
                                        <MenuItem value="720p">HD (720p)</MenuItem>
                                        <MenuItem value="480p">Standard Definition (480p)</MenuItem>
                                    </Select>
                                </FormControl>
                                <Stack direction="row" justifyContent="space-between" color="text.secondary">
                                    <Typography variant="body2">Aspect Ratio: 16:9</Typography>
                                    <Typography variant="body2">Frame Rate: 30fps</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(VideoSettings);