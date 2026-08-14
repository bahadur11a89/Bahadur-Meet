import React from 'react';
import { Card, CardContent, Typography, Stack, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

const RegionSettings = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <PublicIcon />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Region & Formats</Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth><InputLabel>Country</InputLabel><Select label="Country" defaultValue="US"><MenuItem value="US">United States</MenuItem></Select></FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth><InputLabel>Date Format</InputLabel><Select label="Date Format" defaultValue="mm/dd/yyyy"><MenuItem value="mm/dd/yyyy">MM/DD/YYYY</MenuItem></Select></FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth><InputLabel>Time Format</InputLabel><Select label="Time Format" defaultValue="12h"><MenuItem value="12h">12-hour</MenuItem></Select></FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth><InputLabel>Currency</InputLabel><Select label="Currency" defaultValue="USD"><MenuItem value="USD">USD ($)</MenuItem></Select></FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RegionSettings;