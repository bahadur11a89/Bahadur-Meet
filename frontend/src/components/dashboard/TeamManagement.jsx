import React, { useState } from 'react';
import { Box, Typography, Grid, Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import TeamCard from '../TeamCard/TeamCard';
import CreateTeamDialog from '../CreateTeamDialog/CreateTeamDialog';

const teams = [
    {
        name: 'Engineering',
        description: 'Builds and maintains the core product.',
        members: 128,
        lead: 'Sarah Connor',
        activeProjects: 8,
    },
    {
        name: 'Product',
        description: 'Defines the product vision and roadmap.',
        members: 24,
        lead: 'John Doe',
        activeProjects: 4,
    },
    {
        name: 'Design',
        description: 'Creates user-friendly interfaces.',
        members: 15,
        lead: 'Jane Smith',
        activeProjects: 6,
    },
    {
        name: 'Marketing',
        description: 'Manages brand and customer outreach.',
        members: 32,
        lead: 'Michael Bay',
        activeProjects: 12,
    },
];

const TeamManagement = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Teams
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpenDialog}>
                    Create Team
                </Button>
            </Stack>
            <Grid container spacing={3}>
                {teams.map((team, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <TeamCard team={team} />
                    </Grid>
                ))}
            </Grid>
            <CreateTeamDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
            />
        </Box>
    );
};

export default TeamManagement;