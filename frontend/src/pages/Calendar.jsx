import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Divider,
} from '@mui/material';
import { CalendarMonth, Add, EventNote } from '@mui/icons-material';

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState('month');

  const upcomingEvents = [
    { title: 'Sprint Planning', date: 'Today, 2:00 PM', duration: '60m', type: 'Work' },
    { title: 'Architecture Review', date: 'Aug 10, 10:00 AM', duration: '45m', type: 'Technical' },
    { title: 'All-Hands Townhall', date: 'Aug 12, 4:00 PM', duration: '90m', type: 'Company' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Calendar</Typography>
          <Typography variant="body2" color="text.secondary">View and schedule upcoming meetings</Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <ToggleButtonGroup value={viewMode} exclusive onChange={(e, v) => v && setViewMode(v)} size="small">
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" startIcon={<Add />}>Create Event</Button>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Calendar Grid Representation */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold">August 2026</Typography>
              <Chip label={viewMode.toUpperCase() + ' VIEW'} color="primary" size="small" />
            </Box>
            <Grid container spacing={1} textAlign="center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <Grid item xs={1.71} key={d}>
                  <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">{d}</Typography>
                </Grid>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <Grid item xs={1.71} key={i}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: i + 1 === 8 ? 'primary.main' : 'grey.50',
                      color: i + 1 === 8 ? 'white' : 'text.primary',
                      fontWeight: i + 1 === 8 ? 'bold' : 'normal',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: i + 1 === 8 ? 'primary.dark' : 'grey.200' },
                    }}
                  >
                    {i + 1}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Upcoming Events Sidebar */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Scheduled Meetings</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {upcomingEvents.map((evt, idx) => (
                <Box key={idx} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, borderLeft: '4px solid #0b5cff' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="bold">{evt.title}</Typography>
                    <Chip label={evt.type} size="small" color="primary" variant="outlined" />
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <EventNote fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">{evt.date} ({evt.duration})</Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
