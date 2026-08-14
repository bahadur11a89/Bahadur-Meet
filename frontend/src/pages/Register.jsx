// src/pages/Register.jsx
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthLayout from '../components/auth/AuthLayout';
import AuthBanner from '../components/auth/AuthBanner'; // Re-import AuthBanner
import RegisterForm from '../components/auth/RegisterForm';

const defaultTheme = createTheme();

export default function Register() {
  // Features specific to the Register page's branding panel
  const registerFeatures = [
    "Secure Meetings",
    "HD Video",
    "AI Companion",
    "Screen Sharing",
    "Meeting Recording",
    "Team Chat",
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline /> {/* Ensures consistent baseline styles */}
      <AuthLayout banner={<AuthBanner features={registerFeatures} />}>
        <RegisterForm />
      </AuthLayout>
    </ThemeProvider>
  );
}