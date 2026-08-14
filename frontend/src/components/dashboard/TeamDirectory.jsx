import React from 'react';
import { Box, Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MemberCard from './MemberCard';

const demoMembers = [
  { name: 'Alice Johnson', role: 'Lead Engineer', department: 'Engineering', status: 'Online', avatar: '/static/images/avatar/1.jpg' },
  { name: 'Bob Williams', role: 'Product Manager', department: 'Product', status: 'Busy', avatar: '/static/images/avatar/2.jpg' },
  { name: 'Charlie Brown', role: 'UX/UI Designer', department: 'Design', status: 'Away', avatar: '/static/images/avatar/3.jpg' },
  { name: 'David Chen', role: 'Marketing Lead', department: 'Marketing', status: 'Offline', avatar: '/static/images/avatar/4.jpg' },
];

const TeamDirectory = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Team Directory</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField size="small" placeholder="Search members" InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
        <Button variant="outlined" startIcon={<FilterListIcon />}>Filter</Button>
      </Box>
      <Grid container spacing={3}>
        {demoMembers.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <MemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamDirectory;