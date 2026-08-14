import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    Slider,
    Button,
    Stack,
    Grid,
    LinearProgress,
    FormControl,
    InputLabel
} from '@mui/material';
import { Mic, VolumeUp, GraphicEq } from '@mui/icons-material';
import AudioTestPanel from '../meeting/AudioTestPanel';
import styles from './AudioSettings.module.css';

const AudioSettings = () => {
    const [micVolume, setMicVolume] = useState(70);
    const [speakerVolume, setSpeakerVolume] = useState(80);
    const [selectedMic, setSelectedMic] = useState('default');
    const [selectedSpeaker, setSelectedSpeaker] = useState('default');

    return (
        <Box className={styles.container}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Audio Settings
            </Typography>
            <Grid container spacing={3}>
                {/* Microphone Settings */}
                <Grid item xs={12} md={6}>
                    <Card className={styles.card}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Mic color="primary" />
                                    <Typography variant="h6" component="div">Microphone</Typography>
                                </Stack>
                                <FormControl fullWidth>
                                    <InputLabel id="mic-select-label">Input Device</InputLabel>
                                    <Select
                                        labelId="mic-select-label"
                                        value={selectedMic}
                                        label="Input Device"
                                        onChange={(e) => setSelectedMic(e.target.value)}
                                    >
                                        <MenuItem value="default">Default - MacBook Pro Microphone</MenuItem>
                                        <MenuItem value="mic2">External USB Mic</MenuItem>
                                        <MenuItem value="mic3">Bluetooth Headset</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box>
                                    <Typography gutterBottom variant="body2">Input Volume</Typography>
                                    <Slider
                                        aria-label="Microphone volume"
                                        value={micVolume}
                                        onChange={(e, newValue) => setMicVolume(newValue)}
                                    />
                                </Box>
                                <Box>
                                    <Typography gutterBottom variant="body2">Input Level</Typography>
                                    <LinearProgress variant="determinate" value={Math.random() * 80 + 10} className={styles.inputLevel} />
                                    <Typography variant="caption" color="text.secondary">
                                        A silent room should show a low input level.
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Speaker Settings */}
                <Grid item xs={12} md={6}>
                    <Card className={styles.card}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <VolumeUp color="primary" />
                                    <Typography variant="h6" component="div">Speaker</Typography>
                                </Stack>
                                <FormControl fullWidth>
                                    <InputLabel id="speaker-select-label">Output Device</InputLabel>
                                    <Select
                                        labelId="speaker-select-label"
                                        value={selectedSpeaker}
                                        label="Output Device"
                                        onChange={(e) => setSelectedSpeaker(e.target.value)}
                                    >
                                        <MenuItem value="default">Default - MacBook Pro Speakers</MenuItem>
                                        <MenuItem value="speaker2">External Monitor</MenuItem>
                                        <MenuItem value="speaker3">Bluetooth Headset</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box>
                                    <Typography gutterBottom variant="body2">Output Volume</Typography>
                                    <Slider
                                        aria-label="Speaker volume"
                                        value={speakerVolume}
                                        onChange={(e, newValue) => setSpeakerVolume(newValue)}
                                    />
                                </Box>
                                <Button variant="outlined" startIcon={<GraphicEq />}>
                                    Test Speaker
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Audio Test Panel */}
                <Grid item xs={12}>
                    <AudioTestPanel />
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(AudioSettings);