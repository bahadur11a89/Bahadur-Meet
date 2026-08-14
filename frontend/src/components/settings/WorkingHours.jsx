import React from 'react';
import { Card, CardContent, Typography, Stack, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const WorkingHours = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <WorkHistoryIcon />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Working Hours</Typography>
        </Stack>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField label="Start Time" type="time" defaultValue="09:00" InputLabelProps={{ shrink: true }} />
          <TextField label="End Time" type="time" defaultValue="17:00" InputLabelProps={{ shrink: true }} />
        </Stack>
        <FormGroup row>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Mon" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Tue" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Wed" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Thu" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Fri" />
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default WorkingHours;