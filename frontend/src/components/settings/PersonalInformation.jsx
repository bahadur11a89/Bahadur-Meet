import React from 'react';
import { Card, CardContent, Typography, Stack, Button, Grid, TextField } from '@mui/material';

const PersonalInformation = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>Personal Information</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}><TextField label="Full Name" defaultValue="Max Mustermann" fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Username" defaultValue="max_m" fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Email" defaultValue="max.mustermann@example.com" fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Phone" defaultValue="+1 123 456 7890" fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Job Title" defaultValue="Lead Engineer" fullWidth /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Department" defaultValue="Engineering" fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Location" defaultValue="New York, USA" fullWidth /></Grid>
          <Grid item xs={12}>
            <TextField label="Bio" multiline rows={3} fullWidth defaultValue="Senior architect passionate about building scalable frontend systems." />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} mt={3} justifyContent="flex-end">
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;