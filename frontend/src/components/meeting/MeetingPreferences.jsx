import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    FormControlLabel,
    Switch,
    Divider
} from '@mui/material';
import styles from './MeetingPreferences.module.css';

const preferences = [
    { id: 'autoJoinAudio', label: 'Automatically join audio by computer when joining a meeting', defaultChecked: true },
    { id: 'autoStartVideo', label: 'Start my video when joining a meeting', defaultChecked: false },
    { id: 'muteOnEntry', label: 'Mute my microphone when joining a meeting', defaultChecked: true },
    { id: 'showNames', label: 'Always display participant names on their video', defaultChecked: true },
    { id: 'enableChat', label: 'Enable meeting chat', defaultChecked: true },
    { id: 'enableReactions', label: 'Enable emoji reactions', defaultChecked: true },
];

const MeetingPreferences = () => {
    return (
        <Box className={styles.container}>
            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Meeting Preferences
                    </Typography>
                    <Stack divider={<Divider />} spacing={1}>
                        {preferences.map(pref => (
                            <FormControlLabel
                                key={pref.id}
                                control={<Switch defaultChecked={pref.defaultChecked} />}
                                label={
                                    <Typography variant="body1">{pref.label}</Typography>
                                }
                                className={styles.formControlLabel}
                            />
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default React.memo(MeetingPreferences);