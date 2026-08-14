import React from 'react';
import { Box, Typography, Button, Stack, Chip, Paper, Avatar } from '@mui/material';
import { Business, Edit, Settings } from '@mui/icons-material';
import styles from './OrganizationHeader.module.css';

const OrganizationHeader = () => {
    return (
        <Paper elevation={2} className={styles.headerPaper}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                alignItems={{ xs: 'flex-start', md: 'center' }}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar variant="rounded" sx={{ width: 64, height: 64, bgcolor: 'primary.light' }}>
                        <Business sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                Innovate Corp
                            </Typography>
                            <Chip label="Enterprise Plan" color="primary" size="small" variant="filled" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            Industry: Technology & SaaS | Created: Jan 15, 2022
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignSelf={{ xs: 'flex-end', md: 'center' }}>
                    <Button variant="outlined" startIcon={<Edit />}>
                        Edit Organization
                    </Button>
                    <Button variant="contained" startIcon={<Settings />}>
                        Manage Workspace
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default React.memo(OrganizationHeader);