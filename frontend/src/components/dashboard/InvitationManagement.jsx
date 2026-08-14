import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import InvitationCard from '../InvitationCard/InvitationCard';

const invitations = [
    { email: 'new.dev@example.com', role: 'Member', team: 'Engineering', date: 'Oct 20, 2023', status: 'Pending' },
    { email: 'pm.lead@example.com', role: 'Admin', team: 'Product', date: 'Oct 18, 2023', status: 'Accepted' },
    { email: 'old.invite@example.com', role: 'Member', team: 'Marketing', date: 'Sep 15, 2023', status: 'Expired' },
];

const InvitationManagement = () => {
    return (
        <Box sx={{ p: 3, mt: 4, backgroundColor: '#fff', borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={3}>
                Pending & Recent Invitations
            </Typography>
            <Stack spacing={2}>
                {invitations.map((invite, index) => (
                    <InvitationCard key={index} invitation={invite} />
                ))}
            </Stack>
        </Box>
    );
};

export default InvitationManagement;