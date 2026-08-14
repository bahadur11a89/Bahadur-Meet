import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import { Engineering, People, MonetizationOn, BusinessCenter, Brush } from '@mui/icons-material';
import styles from './DepartmentManagement.module.css';

const departments = [
    { name: 'Engineering', members: 250, managers: 12, teams: 15, icon: <Engineering /> },
    { name: 'Human Resources', members: 30, managers: 4, teams: 3, icon: <People /> },
    { name: 'Finance', members: 45, managers: 6, teams: 5, icon: <MonetizationOn /> },
    { name: 'Operations', members: 80, managers: 8, teams: 10, icon: <BusinessCenter /> },
    { name: 'Design', members: 55, managers: 5, teams: 7, icon: <Brush /> },
];

const DepartmentManagement = () => {
    return (
        <Box sx={{ p: 3, mt: 4, backgroundColor: '#fff', borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={3}>
                Departments
            </Typography>
            <Grid container spacing={3}>
                {departments.map((dept, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className={styles.deptCard} variant="outlined">
                            <CardContent>
                                <Stack spacing={1.5}>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                        {dept.icon}
                                        <Typography variant="h6">{dept.name}</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Chip label={`${dept.members} Members`} size="small" />
                                        <Chip label={`${dept.managers} Managers`} size="small" />
                                        <Chip label={`${dept.teams} Teams`} size="small" />
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DepartmentManagement;