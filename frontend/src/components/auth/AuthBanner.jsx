// src/components/auth/AuthBanner.jsx
import React from 'react';
import { Box, Typography, Stack, List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './AuthBanner.module.css';

function AuthBanner({ features }) {
  const defaultFeatures = [
    "Secure Meetings",
    "HD Video & Audio",
    "Team Chat & File Sharing",
    "AI Companion",
  ];

  const currentFeatures = features || defaultFeatures;

  // A placeholder for a more dynamic icon mapping in the future
  const getFeatureIcon = (feature) => {
    return <CheckCircleOutlineIcon sx={{ color: 'common.white' }} />;
  };
  return (
    <Box
      sx={{
        display: 'flex', // Always flex for internal layout
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 4,
        color: 'common.white',
        textAlign: 'center',
        height: '100%',
      }}
      className={styles.authBannerGradient}
    >
      <Stack spacing={2} alignItems="center">
        {/* Logo Placeholder */}
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <SvgIcon sx={{ fontSize: 32, color: 'common.white' }}>
            {/* Placeholder for Zoom-like logo */}
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        </Box>

        <Typography variant="h4" component="h1" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 300 }}>
          Join your colleagues and clients for seamless communication and collaboration.
        </Typography>
      </Stack>

      <Stack spacing={1} sx={{ my: 4, maxWidth: 300 }}>
        <List dense sx={{ textAlign: 'left' }}>
          {currentFeatures.map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: '30px' }}>
                {getFeatureIcon(feature)}
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </Stack>

      {/* Bottom Illustration Placeholder */}
      <Box
        sx={{
          width: '100%',
          height: 150,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" color="common.white">Illustration Placeholder</Typography>
      </Box>
    </Box>
  );
}

export default AuthBanner;