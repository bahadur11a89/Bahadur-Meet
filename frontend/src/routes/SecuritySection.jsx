import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

const securityFeatures = [
  { icon: <LockIcon />, text: 'End-to-End Encryption' },
  { icon: <AdminPanelSettingsIcon />, text: 'Role Based Access' },
  { icon: <VpnKeyIcon />, text: 'JWT Authentication' },
  { icon: <SecurityIcon />, text: 'Meeting Passwords' },
  { icon: <PeopleIcon />, text: 'Waiting Room' },
  { icon: <CloudDoneIcon />, text: 'Secure Cloud' },
];

const SecuritySection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left: Shield Placeholder */}
          <Grid item xs={12} md={4} textAlign="center">
            <Paper
              elevation={0}
              sx={{
                width: { xs: 150, md: 200 },
                height: { xs: 150, md: 200 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '50%',
                mx: 'auto',
                mb: { xs: 4, md: 0 },
              }}
            >
              <SecurityIcon sx={{ fontSize: { xs: 80, md: 120 } }} />
            </Paper>
          </Grid>

          {/* Right: Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
              Enterprise-Grade Security
            </Typography>
            <Grid container spacing={3}>
              {securityFeatures.map((feature) => (
                <Grid item xs={12} sm={6} key={feature.text}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        display: 'inline-flex',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {feature.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SecuritySection;