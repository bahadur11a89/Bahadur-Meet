import React from 'react';
import { Card, CardContent, Typography, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimezoneSettings = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <AccessTimeIcon />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Time Zone</Typography>
        </Stack>
        <FormControl fullWidth>
          <InputLabel>Current Time Zone</InputLabel>
          <Select label="Current Time Zone" defaultValue="est"><MenuItem value="est">(GMT-05:00) Eastern Time</MenuItem></Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default TimezoneSettings;