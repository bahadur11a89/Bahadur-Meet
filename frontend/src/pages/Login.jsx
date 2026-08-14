import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner';
import LoginForm from '../components/auth/LoginForm';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline /> {/* Ensures consistent baseline styles */}
            <AuthLayout banner={<AuthBanner />}>
                <LoginForm />
            </AuthLayout>
        </ThemeProvider>
    );
}