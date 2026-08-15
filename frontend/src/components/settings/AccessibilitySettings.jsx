import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    FormControlLabel,
    Switch,
    Divider,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import { FontDownload } from '@mui/icons-material';
import styles from './AccessibilitySettings.module.css';

const accessibilityOptions = [
    { id: 'liveCaptions', label: 'Enable Live Captions', control: <Switch defaultChecked /> },
    { id: 'highContrast', label: 'High Contrast Mode', control: <Switch /> },
    { id: 'screenReader', label: 'Screen Reader Support', control: <Switch defaultChecked /> },
];

const AccessibilitySettings = () => {
    const [captionSize, setCaptionSize] = React.useState('normal');

    return (
        <Box className={styles.container}>
            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Accessibility
                    </Typography>
                    <Stack divider={<Divider />} spacing={1}>
                        {accessibilityOptions.map(opt => (
                            <FormControlLabel
                                key={opt.id}
                                control={opt.control}
                                label={<Typography variant="body1">{opt.label}</Typography>}
                                className={styles.formControlLabel}
                            />
                        ))}
                        <Stack direction="row" justifyContent="space-between" alignItems="center" pt={2} pb={1}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <FontDownload color="action" />
                                <Typography variant="body1">Caption Font Size</Typography>
                            </Stack>
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                    value={captionSize}
                                    onChange={(e) => setCaptionSize(e.target.value)}
                                >
                                    <MenuItem value="small">Small</MenuItem>
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="large">Large</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default React.memo(AccessibilitySettings);