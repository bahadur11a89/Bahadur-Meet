import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { APP_NAME } from '../../utils/constants'; // Assuming APP_NAME is defined here

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const appVersion = '1.0.0'; // Placeholder for application version

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        p: 2,
        textAlign: 'center',
        mt: 'auto', // Pushes footer to the bottom
      }}
    >
      <Typography variant="body2">{APP_NAME} &copy; {currentYear} | Version {appVersion}</Typography>
    </Box>
  );
};

export default Footer;