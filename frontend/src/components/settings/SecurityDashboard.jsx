import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Stack,
    Box,
    Paper,
    CircularProgress,
    Tooltip,
    Avatar
} from '@mui/material';
import {
    Security as SecurityIcon,
    Lock as LockIcon,
    VerifiedUser as VerifiedUserIcon,
    Devices as DevicesIcon,
    PrivacyTip as PrivacyTipIcon,
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import styles from './SecurityDashboard.module.css';

const securityScore = 85;

const securityItems = [
    {
        icon: <LockIcon />,
        title: 'Password Security',
        description: 'Your password is strong and has not been compromised.',
        status: 'Secure',
        statusColor: 'success',
        actionText: 'Manage Password',
    },
    {
        icon: <VerifiedUserIcon />,
        title: 'Two-Factor Authentication',
        description: '2FA is enabled, adding an extra layer of security.',
        status: 'Enabled',
        statusColor: 'success',
        actionText: 'Manage 2FA',
    },
    {
        icon: <DevicesIcon />,
        title: 'Active Sessions',
        description: 'You are logged in on 2 devices.',
        status: '2 Active',
        statusColor: 'primary',
        actionText: 'View Sessions',
    },
    {
        icon: <DevicesIcon />,
        title: 'Connected Devices',
        description: '3 devices are trusted to access your account.',
        status: '3 Trusted',
        statusColor: 'primary',
        actionText: 'Manage Devices',
    },
    {
        icon: <PrivacyTipIcon />,
        title: 'Privacy Controls',
        description: 'Your profile visibility is set to "Contacts Only".',
        status: 'Medium',
        statusColor: 'warning',
        actionText: 'Adjust Privacy',
    },
];

const SecurityDashboard = () => {
    return (
        <Box className={styles.dashboardContainer} sx={{ bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Security Dashboard
            </Typography>

            <Paper elevation={3} className={`${styles.card} ${styles.overviewCard}`}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                            <CircularProgress
                                variant="determinate"
                                value={securityScore}
                                size={120}
                                thickness={4}
                                color={securityScore > 80 ? 'success' : securityScore > 60 ? 'warning' : 'error'}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h4" component="div" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                    {`${securityScore}%`}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'medium' }}>Security Score</Typography>
                        <Typography variant="body2" color="text.secondary">Based on your current settings</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Security Status: All Systems Go!</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Your account is well-protected. Review the quick actions below to further enhance your security.
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                <Button variant="contained" startIcon={<SecurityIcon />}>Run Security Checkup</Button>
                                <Button variant="outlined" startIcon={<PrivacyTipIcon />}>Review Privacy Settings</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3} sx={{ mt: 4 }}>
                {securityItems.map((item, index) => (
                    <Grid item xs={12} sm={6} lg={4} key={index}>
                        <Card className={`${styles.card} ${styles.securityItemCard}`}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                                        {item.icon}
                                    </Avatar>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        {item.title}
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{ minHeight: '40px', mb: 2 }}>
                                    {item.description}
                                </Typography>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Tooltip title={`Status: ${item.status}`} placement="top">
                                        <Chip
                                            icon={item.statusColor === 'success' ? <CheckCircleIcon /> : <WarningIcon />}
                                            label={item.status}
                                            color={item.statusColor}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Tooltip>
                                    <Button size="small" variant="text">{item.actionText}</Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default React.memo(SecurityDashboard);