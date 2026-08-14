import React from 'react';
import { Box, Typography, Grid, Button, Stack, TextField, InputAdornment } from '@mui/material';
import { PersonAdd, Search } from '@mui/icons-material';
import MemberCard from '../MemberCard/MemberCard';

const members = [
    { name: 'Alice Johnson', email: 'alice.j@innovate.corp', role: 'Admin', department: 'Engineering', status: 'online', avatar: 'https://i.pravatar.cc/150?u=alice' },
    { name: 'Bob Williams', email: 'bob.w@innovate.corp', role: 'Member', department: 'Product', status: 'away', avatar: 'https://i.pravatar.cc/150?u=bob' },
    { name: 'Charlie Brown', email: 'charlie.b@innovate.corp', role: 'Member', department: 'Design', status: 'offline', avatar: 'https://i.pravatar.cc/150?u=charlie' },
    { name: 'Diana Prince', email: 'diana.p@innovate.corp', role: 'Member', department: 'Marketing', status: 'online', avatar: 'https://i.pravatar.cc/150?u=diana' },
];

const MemberManagement = () => {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Members
                </Typography>
                <Stack direction="row" spacing={2}>
                    <TextField
                        size="small"
                        placeholder="Search members..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" startIcon={<PersonAdd />}>
                        Invite Member
                    </Button>
                </Stack>
            </Stack>
            <Grid container spacing={3}>
                {members.map((member, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <MemberCard member={member} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MemberManagement;