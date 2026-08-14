import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/ToastProvider';
import { Box, Paper, Typography, TextField, Stack, Link, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { parseApiError } from '../utils/apiUtils';

const LoginPage = () => {
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Paper sx={{ p: 4, maxWidth: 420, width: '100%', borderRadius: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Sign In
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Welcome back! Please enter your details.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <LoadingButton type="submit" variant="contained" size="large" loading={loading} fullWidth>
                            Sign In
                        </LoadingButton>
                        <Typography align="center" variant="body2">
                            Don't have an account?{' '}
                            <Link component={RouterLink} to="/register" underline="hover">
                                Sign up
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;