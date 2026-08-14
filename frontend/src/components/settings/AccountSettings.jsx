import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import AccountInformation from '../AccountInformation/AccountInformation';
import LanguageSettings from '../LanguageSettings/LanguageSettings';
import RegionSettings from '../RegionSettings/RegionSettings';
import TimezoneSettings from '../TimezoneSettings/TimezoneSettings';

const AccountSettings = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Account Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}><AccountInformation /></Grid>
        <Grid item xs={12} md={6}><LanguageSettings /></Grid>
        <Grid item xs={12} md={6}><RegionSettings /></Grid>
        <Grid item xs={12} md={6}><TimezoneSettings /></Grid>
      </Grid>
    </Box>
  );
};

export default AccountSettings;