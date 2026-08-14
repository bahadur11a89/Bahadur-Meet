// src/components/auth/OtpForm.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Link,
} from '@mui/material';
import styles from './Auth.module.css';

function OtpForm() {
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
          p: { xs: 3, sm: 4 },
          borderRadius: '16px',
          maxWidth: 450,
          width: '100%',
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Check your email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We've sent a 6-digit code to your email address.
            </Typography>
          </Box>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="otp"
              label="Verification Code"
              name="otp"
              autoFocus
              inputProps={{
                maxLength: 6,
                style: {
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  letterSpacing: { xs: '0.5rem', sm: '1rem' },
                  paddingLeft: { xs: '0.5rem', sm: '1rem' },
                },
              }}
              helperText="Enter the 6-digit code"
              error={false}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={false}
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: '8px' }}
              className={styles.hoverButton}
            >
              Verify Account
            </LoadingButton>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Didn't receive the code?{' '}
              <Link component="button" variant="body2" fontWeight="medium" onClick={() => { /* Resend logic */ }}>
                Resend Code
              </Link>
            </Typography>
            <Button
              component={RouterLink}
              to="/login"
              fullWidth
              variant="text"
              sx={{ mt: 2 }}
            >
              Back to Login
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default OtpForm;