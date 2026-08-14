// src/components/auth/StatusCard.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './Auth.module.css';

function StatusCard({ status, title, message, buttonText, buttonLink }) {
  const isSuccess = status === 'success';

  return (
    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper
        variant="outlined"
        className={styles.formCard}
        sx={{ p: 4, borderRadius: '16px', maxWidth: 450, width: '100%', textAlign: 'center' }}
      >
        <Stack spacing={3} alignItems="center">
          <Box sx={{ color: isSuccess ? 'success.main' : 'error.main' }}>
            {isSuccess ? (
              <CheckCircleOutlineIcon sx={{ fontSize: 60 }} />
            ) : (
              <ErrorOutlineIcon sx={{ fontSize: 60 }} />
            )}
          </Box>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
          <Button
            component={RouterLink}
            to={buttonLink}
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5, borderRadius: '8px' }}
            className={styles.hoverButton}
          >
            {buttonText}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default StatusCard;