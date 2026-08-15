import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add, EventNote, PlayArrow } from '@mui/icons-material';
import { meetingService } from '../services/meeting.service';

export default function CalendarPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meetings, setMeetings] = useState([]);

  const loadMeetings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await meetingService.getAllMeetings();
      const fetched = res.data?.meetings || res.data || res.meetings || [];
      setMeetings(Array.isArray(fetched) ? fetched : []);
    } catch (err) {
      console.error('Failed to load calendar meetings:', err);
      setError('Failed to load calendar events. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeetings();
  }, [loadMeetings]);

  const now = new Date();
  const currentMonthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });
  const currentDay = now.getDate();

  // Create a map of day number -> array of meetings for this month
  const meetingDaysMap = {};
  meetings.forEach((m) => {
    const d = new Date(m.startedAt || m.createdAt || Date.now());
    const dayNum = d.getDate();
    if (!meetingDaysMap[dayNum]) {
      meetingDaysMap[dayNum] = [];
    }
    meetingDaysMap[dayNum].push(m);
  });

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
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/meetings')}>Create Event</Button>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Calendar Grid Representation */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">{currentMonthName}</Typography>
                <Chip label={viewMode.toUpperCase() + ' VIEW'} color="primary" size="small" />
              </Box>
              <Grid container spacing={1} textAlign="center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <Grid item xs={1.71} key={d}>
                    <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">{d}</Typography>
                  </Grid>
                ))}
                {Array.from({ length: 31 }).map((_, i) => {
                  const dayNum = i + 1;
                  const hasEvents = meetingDaysMap[dayNum] && meetingDaysMap[dayNum].length > 0;
                  const isToday = dayNum === currentDay;

                  return (
                    <Grid item xs={1.71} key={i}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: isToday ? 'primary.main' : hasEvents ? 'rgba(14, 114, 237, 0.1)' : 'grey.50',
                          color: isToday ? 'white' : hasEvents ? '#0E72ED' : 'text.primary',
                          fontWeight: isToday || hasEvents ? 'bold' : 'normal',
                          border: hasEvents && !isToday ? '1px solid #0E72ED' : 'none',
                          cursor: 'pointer',
                          '&:hover': { bgcolor: isToday ? 'primary.dark' : 'grey.200' },
                        }}
                      >
                        {dayNum}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          </Grid>

          {/* Scheduled Meetings Sidebar */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 3, p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>Scheduled Meetings</Typography>
              <Divider sx={{ mb: 2 }} />
              {meetings.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <Typography variant="body2" color="text.secondary">No scheduled meetings found.</Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {meetings.slice(0, 5).map((m) => (
                    <Box key={m._id || m.meetingCode} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, borderLeft: '4px solid #0E72ED' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight="bold">{m.title || 'Untitled Meeting'}</Typography>
                        <Chip label={m.status || 'Live'} size="small" color="primary" variant="outlined" />
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" mt={1} mb={1.5}>
                        <EventNote fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {m.startedAt ? new Date(m.startedAt).toLocaleString() : 'Scheduled'}
                        </Typography>
                      </Stack>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<PlayArrow fontSize="small" />}
                        onClick={() => navigate(`/meeting/${m.meetingCode}`)}
                        sx={{ textTransform: 'none', borderRadius: 10, fontSize: '0.75rem' }}
                      >
                        Join Meeting
                      </Button>
                    </Box>
                  ))}
                </Stack>
              )}
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
