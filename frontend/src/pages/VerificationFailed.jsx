// src/pages/VerificationFailed.jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner';
import StatusCard from '../components/auth/StatusCard';

const defaultTheme = createTheme();

export default function VerificationFailed() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthLayout banner={<AuthBanner />}>
        <StatusCard
          status="error"
          title="Verification Failed"
          description="The code you entered is incorrect or has expired. Please try again."
          buttonText="Try Again"
          buttonLink="/otp-verification"
        />
      </AuthLayout>
    </ThemeProvider>
  );
}