// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Divider,
  Stack,
  Paper,
  Alert,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import styles from './Auth.module.css';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/ToastProvider';
import { parseApiError } from '../../utils/apiUtils';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      try {
          await login(credentials);
          showToast('Login successful!', 'success');
          navigate(from, { replace: true });
      } catch (err) {
          setError(parseApiError(err));
          setLoading(false);
      }
  };

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
        width: '100%', // Ensure Box takes full width of its parent Grid item
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
              Sign in to Bahadur Meet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Continue your meetings securely
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              helperText="Enter your registered email address"
              error={!!error}
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText="Password must be at least 8 characters"
              error={!!error}
              value={credentials.password}
              onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ alignSelf: 'center' }}>
                Forgot password?
              </Link>
            </Box>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: '8px' }}
              className={styles.hoverButton}
            >
              Sign In
            </LoadingButton>
          </Box>

          <Divider>OR</Divider>

          <Stack spacing={1}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ py: 1.5, borderRadius: '8px' }}
              className={styles.hoverButton}
            >
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<MicrosoftIcon />}
              sx={{ py: 1.5, borderRadius: '8px' }}
              className={styles.hoverButton}
            >
              Continue with Microsoft
            </Button>
          </Stack>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" variant="body2" fontWeight="medium">
                Create Account
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginForm;