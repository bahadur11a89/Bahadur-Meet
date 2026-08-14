import React from 'react';
import { Card, CardContent, Typography, Stack, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSettings = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LanguageIcon />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Language</Typography>
        </Stack>
        <FormControl fullWidth>
          <InputLabel>Display Language</InputLabel>
          <Select label="Display Language" defaultValue="en">
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Switch sx={{ mt: 1 }} />} label="Enable automatic translation" />
      </CardContent>
    </Card>
  );
};

export default LanguageSettings;