import React from 'react';
import { Grid, Card, CardContent, Typography, Stack, Avatar, Box, LinearProgress, Chip } from '@mui/material';
import { People, Groups, Upcoming, SdStorage, BarChart, Apartment } from '@mui/icons-material';
import styles from './OrganizationOverview.module.css';

const overviewData = [
    {
        icon: <People />,
        title: 'Total Members',
        value: '1,250',
        color: 'primary.main',
    },
    {
        icon: <Groups />,
        title: 'Active Teams',
        value: '78',
        color: 'success.main',
    },
    {
        icon: <Upcoming />,
        title: 'Upcoming Meetings',
        value: '42',
        color: 'warning.main',
    },
    {
        icon: <Apartment />,
        title: 'Departments',
        value: '12',
        color: 'info.main',
    },
];

const OrganizationOverview = ({ data }) => {
    // Use fetched data if available, otherwise use static placeholder data
    const displayData = data?.overview || overviewData;
    return (
        <Box>
            <Grid container spacing={3}>
                {displayData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card className={styles.statCard}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Stack spacing={1}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{item.value}</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                                    </Stack>
                                    <Avatar sx={{ bgcolor: item.color, color: '#fff' }}>
                                        {item.icon}
                                    </Avatar>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={12} md={6}>
                    <Card className={`${styles.statCard} ${styles.fullHeightCard}`}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <SdStorage color="action" />
                                    <Typography variant="h6">Storage Used</Typography>
                                </Stack>
                                <LinearProgress variant="determinate" value={65} sx={{ height: 8, borderRadius: 4 }} />
                                <Typography variant="body2" color="text.secondary" >
                                    <strong>650 GB</strong> of 1 TB used
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card className={`${styles.statCard} ${styles.fullHeightCard}`}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <BarChart color="action" />
                                    <Typography variant="h6">Monthly Usage</Typography>
                                    <Chip label="+15% vs last month" color="success" size="small" variant="outlined" />
                                </Stack>
                                <Typography variant="body2" color="text.secondary" >
                                    <strong>12,450</strong> meeting minutes used this month.
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default React.memo(OrganizationOverview);