// src/pages/ForgotPassword.jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

const defaultTheme = createTheme();

export default function ForgotPassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthLayout banner={<AuthBanner />}>
        <ForgotPasswordForm />
      </AuthLayout>
    </ThemeProvider>
  );
}