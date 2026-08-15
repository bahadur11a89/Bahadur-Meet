import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  VideoCall,
  CalendarMonth,
  AddLink,
  PlayArrow,
  ContentCopy,
  Delete,
  Edit,
  Search,
} from '@mui/icons-material';
import { meetingService } from '../services/meeting.service';

export default function MeetingsPage() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [meetingCode, setMeetingCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '', duration: '30' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [meetings, setMeetings] = useState([]);

  const loadMeetings = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      const res = await meetingService.getAllMeetings(params);
      const fetched = res.data?.meetings || res.data || res.meetings || [];
      setMeetings(Array.isArray(fetched) ? fetched : []);
    } catch (err) {
      console.error('Failed to load meetings:', err);
      setError('Failed to load meetings. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleInstantMeeting = async () => {
    try {
      const res = await meetingService.createMeeting({ title: 'Instant Meeting' });
      const code = res.data?.data?.meetingCode || res.data?.meetingCode || res.meetingCode;
      if (code) {
        navigate(`/meeting/${code}`);
      }
    } catch (err) {
      console.error('Failed to create instant meeting:', err);
      setError('Failed to create instant meeting.');
    }
  };

  const handleScheduleSubmit = async () => {
    if (!newMeeting.title.trim()) {
      setError('Please provide a meeting title.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await meetingService.createMeeting({
        title: newMeeting.title.trim(),
        date: newMeeting.date,
        time: newMeeting.time,
      });
      setOpenSchedule(false);
      setNewMeeting({ title: '', date: '', time: '', duration: '30' });
      await loadMeetings();
    } catch (err) {
      console.error('Failed to schedule meeting:', err);
      setError('Failed to schedule meeting. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      navigate(`/meeting/${meetingCode.trim()}`);
    }
  };

  const upcomingMeetings = meetings.filter(m => m.status !== 'ended');
  const pastMeetings = meetings.filter(m => m.status === 'ended');

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Meetings</Typography>
          <Typography variant="body2" color="text.secondary">Schedule, manage, and join your video meetings</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" startIcon={<VideoCall />} onClick={handleInstantMeeting}>
            New Instant Meeting
          </Button>
          <Button variant="outlined" color="primary" startIcon={<CalendarMonth />} onClick={() => setOpenSchedule(true)}>
            Schedule Meeting
          </Button>
          <Button variant="outlined" color="secondary" startIcon={<AddLink />} onClick={() => setOpenJoin(true)}>
            Join Meeting
          </Button>
        </Stack>
      </Box>

      {/* Search & Tabs */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1 }}>
          <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
            <Tab label={`Upcoming Meetings (${upcomingMeetings.length})`} />
            <Tab label={`Past Meetings (${pastMeetings.length})`} />
          </Tabs>
        </Box>
        <TextField
          size="small"
          placeholder="Search meetings by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />,
          }}
          sx={{ width: 280, ml: 2 }}
        />
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Tab Panels */}
          {tabIndex === 0 && (
            upcomingMeetings.length === 0 ? (
              <Box textAlign="center" py={6} sx={{ bgcolor: 'grey.50', borderRadius: 3, border: '1px dashed #cbd5e1' }}>
                <Typography variant="h6" color="text.secondary" fontWeight="600">No Upcoming Meetings</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>Click "Schedule Meeting" or "New Instant Meeting" to create one.</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {upcomingMeetings.map((m) => (
                  <Grid item xs={12} md={6} key={m._id || m.meetingCode}>
                    <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">{m.title || 'Untitled Meeting'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {m.startedAt ? new Date(m.startedAt).toLocaleString() : 'Scheduled'}
                            </Typography>
                          </Box>
                          <Chip label={m.status || 'Upcoming'} color="primary" size="small" />
                        </Stack>
                        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                          Host: {m.host?.name || 'You'} | Code: <strong>{m.meetingCode}</strong>
                        </Typography>
                        <Stack direction="row" spacing={1.5}>
                          <Button variant="contained" startIcon={<PlayArrow />} onClick={() => navigate(`/meeting/${m.meetingCode}`)}>
                            Start Meeting
                          </Button>
                          <Button variant="outlined" startIcon={<ContentCopy />} onClick={() => navigator.clipboard.writeText(window.location.origin + '/meeting/' + m.meetingCode)}>
                            Copy Link
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )
          )}

          {tabIndex === 1 && (
            pastMeetings.length === 0 ? (
              <Box textAlign="center" py={6} sx={{ bgcolor: 'grey.50', borderRadius: 3, border: '1px dashed #cbd5e1' }}>
                <Typography variant="h6" color="text.secondary" fontWeight="600">No Past Meetings</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>Completed meetings will appear here.</Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {pastMeetings.map((m) => (
                  <Grid item xs={12} md={6} key={m._id || m.meetingCode}>
                    <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">{m.title || 'Untitled Meeting'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Ended: {m.endedAt ? new Date(m.endedAt).toLocaleString() : 'N/A'}
                            </Typography>
                          </Box>
                          <Chip label="Ended" color="default" size="small" />
                        </Stack>
                        <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                          Code: <strong>{m.meetingCode}</strong>
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <IconButton size="small"><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )
          )}
        </>
      )}

      {/* Schedule Dialog */}
      <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold">Schedule a Meeting</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} mt={1}>
            <TextField label="Meeting Title" fullWidth value={newMeeting.title} onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })} />
            <TextField type="date" label="Date" InputLabelProps={{ shrink: true }} fullWidth value={newMeeting.date} onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })} />
            <TextField type="time" label="Start Time" InputLabelProps={{ shrink: true }} fullWidth value={newMeeting.time} onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenSchedule(false)} disabled={submitting}>Cancel</Button>
          <Button variant="contained" onClick={handleScheduleSubmit} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save & Schedule'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Join Dialog */}
      <Dialog open={openJoin} onClose={() => setOpenJoin(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Join a Meeting</DialogTitle>
        <DialogContent dividers>
          <TextField label="Enter Meeting Code" fullWidth sx={{ mt: 1 }} value={meetingCode} onChange={(e) => setMeetingCode(e.target.value)} placeholder="e.g. meet-101" />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenJoin(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleJoinMeeting}>Join</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
