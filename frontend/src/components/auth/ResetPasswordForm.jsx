// src/components/auth/ResetPasswordForm.jsx
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './ResetPasswordForm.module.css';

function PasswordStrengthIndicator({ strength }) {
  const strengthLevels = {
    weak: { value: 25, color: 'error', label: 'Weak' },
    medium: { value: 60, color: 'warning', label: 'Medium' },
    strong: { value: 100, color: 'success', label: 'Strong' },
  };

  const currentStrength = strengthLevels[strength] || strengthLevels.weak;

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={currentStrength.value} color={currentStrength.color} />
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
        {currentStrength.label}
      </Typography>
    </Box>
  );
}

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  const passwordRequirements = [
    "Minimum 8 characters",
    "One uppercase letter",
    "One lowercase letter",
    "One number",
    "One special character",
  ];

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
              Create New Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose a strong password to secure your account.
            </Typography>
          </Box>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText="Create a strong password"
                error={false}
              />
              <PasswordStrengthIndicator strength="medium" />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText="Re-enter your new password"
                error={false}
              />
            </Stack>

            <Box sx={{ mt: 2, mb: 2 }}>
              <List dense disablePadding>
                {passwordRequirements.map((req, index) => (
                  <ListItem key={index} disableGutters sx={{ py: 0.2 }}>
                    <ListItemIcon sx={{ minWidth: '28px' }}>
                      <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary={req} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              className={styles.hoverButton}
            >
              Update Password
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

export default ResetPasswordForm;