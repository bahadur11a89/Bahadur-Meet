import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import ProfileCard from '../ProfileCard/ProfileCard';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import AvatarSection from '../AvatarSection/AvatarSection';

const Profile = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileCard />
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <PersonalInformation />
            <AvatarSection />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;