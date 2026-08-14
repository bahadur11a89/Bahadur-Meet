import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Chip,
    Stack,
    Box,
    Divider,
    Paper,
    Alert
} from '@mui/material';
import {
    PhonelinkSetup as PhonelinkSetupIcon,
    Sms as SmsIcon,
    Email as EmailIcon,
    VpnKey as VpnKeyIcon,
    CheckCircle,
    Warning
} from '@mui/icons-material';
import styles from './TwoFactorAuthentication.module.css';

const twoFactorOptions = [
    {
        icon: <PhonelinkSetupIcon />,
        title: 'Authenticator App',
        description: 'Use an app like Google Authenticator to get verification codes.',
        enabled: true,
    },
    {
        icon: <SmsIcon />,
        title: 'SMS Verification',
        description: 'Get a verification code via text message to your phone.',
        enabled: false,
    },
    {
        icon: <EmailIcon />,
        title: 'Email Verification',
        description: 'Receive a verification code to your primary email address.',
        enabled: false,
    },
];

const TwoFactorAuthentication = () => {
    return (
        <Box className={styles.container}>
            <Card className={styles.card}>
                <CardHeader
                    title="Two-Factor Authentication (2FA)"
                    subheader="Add an extra layer of security to your account."
                />
                <CardContent>
                    <Stack spacing={3}>
                        {twoFactorOptions.map((option, index) => (
                            <React.Fragment key={index}>
                                <Paper variant="outlined" className={styles.optionPaper}>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Box className={styles.iconWrapper} sx={{ bgcolor: option.enabled ? 'success.light' : 'grey.300' }}>
                                                {option.icon}
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">{option.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">{option.description}</Typography>
                                            </Box>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Chip
                                                icon={option.enabled ? <CheckCircle /> : <Warning />}
                                                label={option.enabled ? 'Enabled' : 'Disabled'}
                                                color={option.enabled ? 'success' : 'default'}
                                                size="small"
                                            />
                                            <Button
                                                variant={option.enabled ? 'outlined' : 'contained'}
                                                color={option.enabled ? 'error' : 'primary'}
                                            >
                                                {option.enabled ? 'Disable' : 'Set Up'}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </React.Fragment>
                        ))}
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Box>
                        <Typography variant="h6" gutterBottom>
                            <VpnKeyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                            Backup Codes
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Store these codes in a safe place. They can be used to access your account if you lose access to your 2FA device.
                        </Typography>
                        <Alert severity="info" sx={{ mb: 2 }}>
                            You have 8 backup codes remaining.
                        </Alert>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained">Show Codes</Button>
                            <Button variant="outlined">Generate New Codes</Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default React.memo(TwoFactorAuthentication);