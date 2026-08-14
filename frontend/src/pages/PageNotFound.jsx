import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" color="primary" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button component={Link} to="/dashboard" variant="contained">
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;