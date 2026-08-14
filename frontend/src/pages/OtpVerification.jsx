// src/pages/OtpVerification.jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner';
import OtpForm from '../components/auth/OtpForm';

const defaultTheme = createTheme();

export default function OtpVerification() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthLayout banner={<AuthBanner />}>
        <OtpForm />
      </AuthLayout>
    </ThemeProvider>
  );
}