// src/components/auth/AuthLayout.jsx
import React from 'react';
import { Grid, Box } from '@mui/material';

function AuthLayout({ banner, children }) {
  return (
    <Grid container component="main" sx={{ minHeight: '100dvh' }}>
      {/* Left Side: AuthBanner */}
      <Grid
        item
        xs={12}
        md={5} // Approximately 40% (5/12) on medium and up
        sx={{
          display: 'flex',
          py: { xs: 6, md: 0 },
          px: { xs: 2, md: 0 },
        }}
      >
        {banner}
      </Grid>

      {/* Right Side: Content (e.g., LoginForm) */}
      <Grid
        item
        xs={12} // Full width on mobile
        md={7} // Approximately 60% (7/12) on medium and up
        component={Box} // Use Box as component to allow flex properties
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default AuthLayout;