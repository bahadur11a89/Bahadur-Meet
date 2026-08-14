import React from 'react';
import { Card, CardContent, Typography, Stack, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AccountInformation = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <AccountCircleIcon />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Account Information</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Manage your account ID, password, and sign-in methods.
        </Typography>
        <Button variant="outlined">Manage Account</Button>
      </CardContent>
    </Card>
  );
};

export default AccountInformation;