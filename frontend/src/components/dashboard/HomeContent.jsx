// src/components/dashboard/HomeContent.jsx
import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function HomeContent() {
  return (
    <Paper sx={{ p: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to your Dashboard
        </Typography>
        <Typography variant="body1">
          This is the main content area for the home page. You can add your dashboard widgets here.
        </Typography>
      </Box>
    </Paper>
  );
}

export default HomeContent;