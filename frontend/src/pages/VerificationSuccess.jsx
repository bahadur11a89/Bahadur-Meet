// src/pages/VerificationSuccess.jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner';
import StatusCard from '../components/auth/StatusCard';

const defaultTheme = createTheme();

export default function VerificationSuccess() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthLayout banner={<AuthBanner />}>
        <StatusCard
          status="success"
          title="Verification Successful!"
          description="Your account has been successfully verified. You can now log in to your dashboard."
          buttonText="Go to Login"
          buttonLink="/login"
        />
      </AuthLayout>
    </ThemeProvider>
  );
}