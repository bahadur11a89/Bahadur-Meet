// src/components/auth/ForgotPasswordForm.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  InputAdornment,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SecurityIcon from '@mui/icons-material/Security';
import styles from './ForgotPasswordForm.module.css';

function ForgotPasswordForm() {
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Paper
        elevation={6}
        sx={{ p: { xs: 3, sm: 4, md: 5 }, borderRadius: '12px', maxWidth: 450, width: '100%' }}
        className={styles.fadeInCard}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Forgot your password?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your registered email address. We'll send you a secure password reset link.
            </Typography>
          </Box>

          <Alert severity="info" icon={<SecurityIcon fontSize="inherit" />} sx={{ mt: 2 }}>
            Password reset instructions will be sent to your registered email.
          </Alert>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
              }}
              helperText="We'll send a reset link to this email"
              error={false}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              className={styles.hoverButton}
            >
              Send Reset Link
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              fullWidth
              variant="text"
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 1 }}
            >
              Back to Login
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ForgotPasswordForm;