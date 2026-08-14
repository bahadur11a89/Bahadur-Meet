import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Switch,
    FormControlLabel,
    Stack,
    Slider,
    Tooltip
} from '@mui/material';
import { Person, WbSunny, AutoFixHigh } from '@mui/icons-material';
import styles from './VideoPreview.module.css';

const VideoPreview = () => {
    const [isMirrored, setIsMirrored] = useState(true);
    const [isHd, setIsHd] = useState(true);
    const [touchUp, setTouchUp] = useState(30);
    const [lowLight, setLowLight] = useState(50);

    return (
        <Card className={styles.previewCard}>
            <CardContent>
                <Box className={styles.videoContainer}>
                    <Avatar className={styles.avatarFallback}>
                        <Person />
                    </Avatar>
                    <Typography className={styles.noCameraText}>Camera is off</Typography>
                </Box>
                <Stack spacing={1} mt={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isMirrored}
                                onChange={(e) => setIsMirrored(e.target.checked)}
                                name="mirrorVideo"
                            />
                        }
                        label="Mirror my video"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isHd}
                                onChange={(e) => setIsHd(e.target.checked)}
                                name="hdVideo"
                            />
                        }
                        label="Enable HD"
                    />
                    <Box>
                        <Tooltip title="Adjust the filter to soften your skin's appearance.">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <AutoFixHigh fontSize="small" color="action" />
                                <Typography variant="body2" sx={{ minWidth: '120px' }}>Touch up</Typography>
                                <Slider
                                    size="small"
                                    value={touchUp}
                                    onChange={(e, val) => setTouchUp(val)}
                                    aria-labelledby="touch-up-slider"
                                />
                            </Stack>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title="Brighten your video in low-light conditions.">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <WbSunny fontSize="small" color="action" />
                                <Typography variant="body2" sx={{ minWidth: '120px' }}>Low light</Typography>
                                <Slider
                                    size="small"
                                    value={lowLight}
                                    onChange={(e, val) => setLowLight(val)}
                                    aria-labelledby="low-light-slider"
                                />
                            </Stack>
                        </Tooltip>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default React.memo(VideoPreview);