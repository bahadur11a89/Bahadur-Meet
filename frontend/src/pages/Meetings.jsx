import React, { useState } from 'react';
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
} from '@mui/material';
import {
  VideoCall,
  CalendarMonth,
  AddLink,
  PlayArrow,
  ContentCopy,
  Delete,
  Edit,
} from '@mui/icons-material';

export default function MeetingsPage() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [meetingCode, setMeetingCode] = useState('');
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '', duration: '30' });

  const upcomingMeetings = [
    { id: 'meet-101', title: 'Sprint Planning & Design Review', time: 'Today, 2:00 PM - 3:00 PM', host: 'You', code: 'meet-101' },
    { id: 'meet-102', title: 'Client Sync - Enterprise Architecture', time: 'Tomorrow, 10:00 AM - 11:00 AM', host: 'Alex Johnson', code: 'meet-102' },
  ];

  const pastMeetings = [
    { id: 'meet-099', title: 'Q3 Product Roadmap Sync', time: 'Yesterday, 4:00 PM', duration: '45 mins', code: 'meet-099' },
    { id: 'meet-098', title: 'Security & Compliance Review', time: 'Aug 5, 2026', duration: '60 mins', code: 'meet-098' },
  ];

  const handleInstantMeeting = () => {
    const randomCode = 'meet-' + Math.floor(1000 + Math.random() * 9000);
    navigate(`/meeting/${randomCode}`);
  };

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      navigate(`/meeting/${meetingCode.trim()}`);
    }
  };

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

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
          <Tab label="Upcoming Meetings" />
          <Tab label="Past Meetings" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      {tabIndex === 0 && (
        <Grid container spacing={3}>
          {upcomingMeetings.map((m) => (
            <Grid item xs={12} md={6} key={m.id}>
              <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{m.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{m.time}</Typography>
                    </Box>
                    <Chip label="Upcoming" color="primary" size="small" />
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    Host: {m.host} | Code: <strong>{m.code}</strong>
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    <Button variant="contained" startIcon={<PlayArrow />} onClick={() => navigate(`/meeting/${m.code}`)}>
                      Start Meeting
                    </Button>
                    <Button variant="outlined" startIcon={<ContentCopy />} onClick={() => navigator.clipboard.writeText(window.location.origin + '/meeting/' + m.code)}>
                      Copy Link
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabIndex === 1 && (
        <Grid container spacing={3}>
          {pastMeetings.map((m) => (
            <Grid item xs={12} md={6} key={m.id}>
              <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{m.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{m.time} ({m.duration})</Typography>
                    </Box>
                    <Chip label="Ended" color="default" size="small" />
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                    Code: <strong>{m.code}</strong>
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
          <Button onClick={() => setOpenSchedule(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenSchedule(false)}>Save & Schedule</Button>
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
