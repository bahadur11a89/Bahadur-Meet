// src/pages/ResetPassword.jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

const defaultTheme = createTheme();

export default function ResetPassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthLayout banner={<AuthBanner />}>
        <ResetPasswordForm />
      </AuthLayout>
    </ThemeProvider>
  );
}