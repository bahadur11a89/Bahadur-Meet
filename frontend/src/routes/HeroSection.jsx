import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, useTheme } from '@mui/material';

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        py: { xs: 8, md: 12 },
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Column: Text and Buttons */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              One Platform to Connect
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Bring teams together, simplify communications, and delight customers with our integrated platform.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button variant="contained" color="primary" size="large">
                Sign Up Free
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Contact Sales
              </Button>
            </Box>
          </Grid>

          {/* Right Column: Placeholder for Meeting Dashboard */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{ p: 4, height: { xs: 250, md: 350 }, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette.background.paper }}
            >
              <Typography variant="h6" color="text.secondary">Meeting Dashboard Placeholder</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;