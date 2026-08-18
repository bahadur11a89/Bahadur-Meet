import * as React from 'react';
import { Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const defaultTheme = createTheme();

export default function Login() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline /> {/* Ensures consistent baseline styles */}
            <AuthLayout banner={<AuthBanner />}>
                <LoginForm />
            </AuthLayout>
        </ThemeProvider>
    );
}