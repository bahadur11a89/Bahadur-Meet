import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './Auth.module.css';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/ToastProvider';
import { parseApiError } from '../../utils/apiUtils';

function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await register({
        name: fullName,
        username: formData.email,
        email: formData.email,
        password: formData.password,
      });
      showToast('Registration successful! Please sign in.', 'success');
      navigate('/login');
    } catch (err) {
      setError(parseApiError(err));
      setLoading(false);
    }
  };

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
        variant="outlined"
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: '16px',
          maxWidth: 500,
          width: '100%',
          overflowY: 'auto',
        }}
        className={styles.fadeInCard}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Create your Bahadur Meet Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join millions of professionals using secure video meetings.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  margin="normal"
                  required
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
                  helperText="Enter your first name"
                />
                <TextField
                  margin="normal"
                  required
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
                  helperText="Enter your last name"
                />
              </Stack>
              <TextField
                margin="normal"
                required
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
                helperText="Enter your work email address"
              />
              <TextField
                margin="normal"
                variant="outlined"
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> }}
                helperText="Enter your contact number"
              />
              <TextField
                margin="normal"
                fullWidth
                variant="outlined"
                id="company"
                label="Company / Organization (Optional)"
                name="company"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
                InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon /></InputAdornment> }}
                helperText="Your company name (optional)"
              />
              <TextField
                margin="normal"
                required
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleChange}
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
              />
              <TextField
                margin="normal"
                required
                variant="outlined"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
                helperText="Re-enter your password"
              />
            </Stack>

            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Password Requirements:
              </Typography>
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

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Stack spacing={1} sx={{ mt: 2, mb: 3 }}>
              <FormControlLabel
                control={<Checkbox value="terms" color="primary" required defaultChecked />}
                label={<Typography variant="body2">I agree to the <Link component={RouterLink} to="/terms">Terms of Service</Link></Typography>}
              />
              <FormControlLabel
                control={<Checkbox value="privacy" color="primary" required defaultChecked />}
                label={<Typography variant="body2">I agree to the <Link component={RouterLink} to="/privacy">Privacy Policy</Link></Typography>}
              />
            </Stack>

            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              variant="contained"
              sx={{ mt: 1, mb: 2, py: 1.5 }}
              className={styles.hoverButton}
            >
              Create Account
            </LoadingButton>
          </Box>

          <Divider>OR</Divider>

          <Stack spacing={1}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ py: 1.5 }}
              className={styles.hoverButton}
            >
              Continue with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<MicrosoftIcon />}
              sx={{ py: 1.5 }}
              className={styles.hoverButton}
            >
              Continue with Microsoft
            </Button>
          </Stack>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link component={RouterLink} to="/login" variant="body2" fontWeight="medium">
                Sign In
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default RegisterForm;