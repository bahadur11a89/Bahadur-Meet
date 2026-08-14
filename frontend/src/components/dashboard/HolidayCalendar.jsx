import React from 'react';
import { Box, Typography, Stack, Card, CardContent } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const holidays = [
  { title: 'Thanksgiving', date: 'Nov 23, 2023', type: 'Company Holiday' },
  { title: 'Christmas Day', date: 'Dec 25, 2023', type: 'Company Holiday' },
  { title: 'Personal Leave', date: 'Dec 26, 2023', type: 'Your Leave' },
];

const HolidayCalendar = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <EventBusyIcon />
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Holidays & Leave</Typography>
      </Stack>
      <Stack spacing={2}>
        {holidays.map((holiday, index) => (
          <Card key={index} variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6">{holiday.title}</Typography>
              <Typography color="text.secondary">{holiday.date} • {holiday.type}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default HolidayCalendar;