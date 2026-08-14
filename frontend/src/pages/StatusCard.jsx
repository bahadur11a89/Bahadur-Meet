// src/components/auth/StatusCard.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './Auth.module.css';

const statusConfig = {
  success: {
    icon: CheckCircleOutlineIcon,
    color: 'success.main',
  },
  error: {
    icon: HighlightOffIcon,
    color: 'error.main',
  },
};

function StatusCard({
  status = 'success',
  title,
  description,
  buttonText,
  buttonLink,
}) {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <Box
      sx={{
        my: 8,
        mx: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        variant="outlined"
        className={styles.formCard}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: '16px',
          maxWidth: 450,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <IconComponent sx={{ fontSize: 80, color: config.color }} />
          <Box>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to={buttonLink}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: '8px' }}
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