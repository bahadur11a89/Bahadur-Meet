import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Stack,
    Box,
    Divider,
    Chip,
    Avatar,
    Tooltip
} from '@mui/material';
import { Laptop, Smartphone, Public, Dns } from '@mui/icons-material';
import styles from './LoginSessions.module.css';

const sessions = [
    {
        device: 'My MacBook Pro',
        browser: 'Chrome on macOS',
        location: 'San Francisco, CA',
        lastActive: 'Now',
        ip: '192.168.1.1',
        isCurrent: true,
        icon: <Laptop />,
    },
    {
        device: 'Pixel 7 Pro',
        browser: 'App on Android',
        location: 'New York, NY',
        lastActive: '2 hours ago',
        ip: '10.0.0.5',
        isCurrent: false,
        icon: <Smartphone />,
    },
    {
        device: 'Windows Desktop',
        browser: 'Firefox on Windows',
        location: 'Chicago, IL',
        lastActive: '1 day ago',
        ip: '172.16.0.10',
        isCurrent: false,
        icon: <Laptop />,
    },
];

const LoginSessions = () => {
    return (
        <Box className={styles.container}>
            <Card className={styles.card}>
                <CardHeader
                    title="Active Login Sessions"
                    subheader="Manage sessions logged into your account."
                />
                <CardContent>
                    <Stack spacing={2} divider={<Divider />}>
                        {sessions.map((session, index) => (
                            <Box key={index} className={styles.sessionItem}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" width="100%">
                                    <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
                                        {session.icon}
                                    </Avatar>
                                    <Stack flexGrow={1} spacing={0.5}>
                                        <Typography variant="h6">{session.device}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {session.browser}
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems="center" color="text.secondary">
                                            <Tooltip title="Location">
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Public fontSize="small" />
                                                    <Typography variant="caption">{session.location}</Typography>
                                                </Stack>
                                            </Tooltip>
                                            <Tooltip title="IP Address">
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Dns fontSize="small" />
                                                    <Typography variant="caption">{session.ip}</Typography>
                                                </Stack>
                                            </Tooltip>
                                        </Stack>
                                    </Stack>
                                    <Stack alignItems={{ xs: 'flex-start', sm: 'flex-end' }} spacing={1}>
                                        {session.isCurrent ? (
                                            <Chip label="Current Session" color="success" size="small" />
                                        ) : (
                                            <Typography variant="caption" color="text.secondary">
                                                Last active: {session.lastActive}
                                            </Typography>
                                        )}
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            disabled={session.isCurrent}
                                        >
                                            Logout Session
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default React.memo(LoginSessions);