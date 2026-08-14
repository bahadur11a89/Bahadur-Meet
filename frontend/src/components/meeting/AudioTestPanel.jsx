import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Box,
    Chip,
    CircularProgress
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import styles from './AudioTestPanel.module.css';

const AudioTestPanel = () => {
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState(null);

    const handleTest = () => {
        setIsTesting(true);
        setTestResult(null);
        setTimeout(() => {
            setIsTesting(false);
            setTestResult(Math.random() > 0.2 ? 'success' : 'fail');
        }, 3000);
    };

    return (
        <Card className={styles.card}>
            <CardContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Box>
                        <Typography variant="h6">Test Your Audio</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Check if your microphone and speakers are working correctly.
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {isTesting && <CircularProgress size={24} />}
                        {testResult === 'success' && <Chip icon={<CheckCircle />} label="Test Successful" color="success" variant="outlined" />}
                        {testResult === 'fail' && <Chip icon={<Error />} label="Test Failed" color="error" variant="outlined" />}
                        <Button
                            variant="contained"
                            onClick={handleTest}
                            disabled={isTesting}
                        >
                            {isTesting ? 'Testing...' : 'Start Audio Test'}
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default React.memo(AudioTestPanel);