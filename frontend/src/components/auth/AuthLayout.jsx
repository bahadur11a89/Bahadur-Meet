import React from 'react';
import { Grid, Box } from '@mui/material';

function AuthLayout({ banner, children }) {
  return (
    <Grid container component="main" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={5} sx={{ display: 'flex', py: { xs: 6, md: 0 }, px: { xs: 2, md: 0 } }}>
        {banner}
      </Grid>
      <Grid item xs={12} md={7} component={Box} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.paper' }}>
        {children}
      </Grid>
    </Grid>
  );
}

export default AuthLayout;
