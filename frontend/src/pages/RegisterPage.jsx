import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/ToastProvider';
import { Box, Paper, Typography, TextField, Stack, Link, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { parseApiError } from '../utils/apiUtils';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(formData);
            showToast('Registration successful!', 'success');
            navigate('/dashboard');
        } catch (err) {
            setError(parseApiError(err));
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Paper sx={{ p: 4, maxWidth: 420, width: '100%', borderRadius: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Create Account
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} required fullWidth />
                        <TextField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth />
                        <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required fullWidth />
                        {error && <Alert severity="error">{error}</Alert>}
                        <LoadingButton type="submit" variant="contained" size="large" loading={loading} fullWidth>
                            Sign Up
                        </LoadingButton>
                        <Typography align="center" variant="body2">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login" underline="hover">
                                Sign in
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;