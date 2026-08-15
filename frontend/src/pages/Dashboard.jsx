import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Avatar,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Fab,
  CircularProgress,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import VideocamIcon from '@mui/icons-material/Videocam';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAuth } from '../context/AuthContext';
import { meetingService } from '../services/meeting.service';

function Dashboard() {
  const navigate = useNavigate();
  const { user, getHistoryOfUser } = useAuth();
  const [copiedPmi, setCopiedPmi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const personalMeetingId = user?.personalMeetingId || user?.username || 'N/A';

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await meetingService.getAllMeetings();
      const fetchedMeetings = res.data?.meetings || res.data || res.meetings || [];
      setMeetings(Array.isArray(fetchedMeetings) ? fetchedMeetings : []);

      const actRes = await getHistoryOfUser();
      const rawAct = Array.isArray(actRes) ? actRes : (actRes?.data?.meetings || actRes?.meetings || []);
      const formattedAct = rawAct.map((item) => ({
        text: item.title || `Meeting: ${item.meetingCode}`,
        time: item.createdAt ? new Date(item.createdAt).toLocaleString() : 'Recent',
        status: item.status === 'ended' ? 'Completed' : 'Live',
      }));
      setRecentActivity(formattedAct);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [getHistoryOfUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCopyPmi = () => {
    navigator.clipboard.writeText(personalMeetingId.replace(/\s/g, ''));
    setCopiedPmi(true);
    setTimeout(() => setCopiedPmi(false), 2000);
  };

  const handleSchedule = () => navigate('/calendar');
  const handleJoin = () => navigate('/meetings');
  const handleHost = async () => {
    try {
      const res = await meetingService.createMeeting({ title: 'Instant Host Meeting' });
      const code = res.data?.data?.meetingCode || res.data?.meetingCode || res.meetingCode;
      if (code) {
        navigate(`/meeting/${code}`);
      } else {
        const fallbackCode = 'host-' + Math.floor(1000 + Math.random() * 9000);
        navigate(`/meeting/${fallbackCode}`);
      }
    } catch (err) {
      console.error('Instant meeting error:', err);
      const fallbackCode = 'host-' + Math.floor(1000 + Math.random() * 9000);
      navigate(`/meeting/${fallbackCode}`);
    }
  };

  return (
    <Box sx={{ position: 'relative', pb: 8 }}>
      <Grid container spacing={3}>
        {/* Left / Main Column */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* User Profile Card */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" spacing={2.5} alignItems="center">
                <Avatar
                  src="/logo_b.png"
                  alt={user?.name || 'Bahadur Raj'}
                  sx={{ width: 64, height: 64, border: '2px solid #0E72ED', bgcolor: '#0E72ED' }}
                >
                  {(user?.name || user?.username || 'B').charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="800" color="#0f172a">
                    {user?.name || user?.username || 'Bahadur Raj'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Plan: <strong style={{ color: '#0f172a' }}>Workplace Basic</strong>
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="column" alignItems="flex-end" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/plans')}
                  sx={{
                    bgcolor: 'rgba(14, 114, 237, 0.08)',
                    color: '#0E72ED',
                    boxShadow: 'none',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 20,
                    px: 2.5,
                    '&:hover': { bgcolor: 'rgba(14, 114, 237, 0.15)', boxShadow: 'none' },
                  }}
                >
                  Manage Plan
                </Button>
                <Typography
                  variant="caption"
                  component="span"
                  onClick={() => navigate('/plans')}
                  sx={{ color: '#0E72ED', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  View Plan Details
                </Typography>
              </Stack>
            </Paper>

            {/* Promotional / Offer Card Banner */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                bgcolor: '#ffffff',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              <Box sx={{ maxWidth: 380 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                  <Chip
                    icon={<VideocamIcon sx={{ fontSize: 16, color: '#0E72ED !important' }} />}
                    label="Workplace Pro"
                    size="small"
                    sx={{ bgcolor: 'rgba(14, 114, 237, 0.1)', color: '#0E72ED', fontWeight: 700, px: 0.5 }}
                  />
                </Stack>
                <Typography variant="h4" fontWeight="800" color="#0f172a" gutterBottom>
                  Limited time offer!
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  Take an additional 15% off when you upgrade to Bahadur Workplace Pro annual!
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={3}>
                  Terms apply.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/plans')}
                  sx={{
                    bgcolor: '#0E72ED',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 20,
                    px: 3,
                    py: 1,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#0A5BBF', boxShadow: 'none' },
                  }}
                >
                  Get offer
                </Button>
              </Box>

              {/* Graphic Mockup Preview */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', md: 280 },
                  height: 180,
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #0b5cff 0%, #002b80 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(14, 114, 237, 0.25)',
                }}
              >
                <img
                  src="/mobile.png"
                  alt="Bahadur Workplace Pro Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            </Paper>

            {/* Recent Activity Section */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" fontWeight="800" color="#0f172a" mb={2}>
                Recent activity
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {loading ? (
                <Box textAlign="center" py={3}>
                  <CircularProgress size={32} />
                </Box>
              ) : recentActivity.length === 0 ? (
                <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
                  No recent activity records.
                </Typography>
              ) : (
                <Stack spacing={2}>
                  {recentActivity.map((item, idx) => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      key={idx}
                      sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ bgcolor: 'rgba(14, 114, 237, 0.1)', color: '#0E72ED', width: 36, height: 36 }}>
                          <HistoryIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="700" color="#0f172a">
                            {item.text}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.time}
                          </Typography>
                        </Box>
                      </Stack>
                      <Chip label={item.status} size="small" variant="outlined" color="primary" sx={{ fontSize: '0.7rem', fontWeight: 600 }} />
                    </Stack>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>
        </Grid>

        {/* Right Column Stack */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Quick Actions Card (Schedule, Join, Host) */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #e2e8f0' }}>
              <Stack direction="row" justifyContent="space-around" alignItems="center" mb={3}>
                {/* Schedule */}
                <Stack spacing={1} alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleSchedule}>
                  <Avatar sx={{ bgcolor: '#0E72ED', width: 48, height: 48, borderRadius: 2.5, boxShadow: '0 4px 12px rgba(14, 114, 237, 0.3)' }}>
                    <CalendarMonthIcon sx={{ color: '#ffffff' }} />
                  </Avatar>
                  <Typography variant="caption" fontWeight="700" color="#334155">
                    Schedule
                  </Typography>
                </Stack>

                {/* Join */}
                <Stack spacing={1} alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleJoin}>
                  <Avatar sx={{ bgcolor: '#0E72ED', width: 48, height: 48, borderRadius: 2.5, boxShadow: '0 4px 12px rgba(14, 114, 237, 0.3)' }}>
                    <AddIcon sx={{ color: '#ffffff' }} />
                  </Avatar>
                  <Typography variant="caption" fontWeight="700" color="#334155">
                    Join
                  </Typography>
                </Stack>

                {/* Host */}
                <Stack spacing={1} alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleHost}>
                  <Avatar sx={{ bgcolor: '#f97316', width: 48, height: 48, borderRadius: 2.5, boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)' }}>
                    <VideocamIcon sx={{ color: '#ffffff' }} />
                  </Avatar>
                  <Typography variant="caption" fontWeight="700" color="#334155">
                    Host
                  </Typography>
                </Stack>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {/* Personal Meeting ID */}
              <Box textAlign="center">
                <Typography variant="caption" color="text.secondary" fontWeight="600" display="block">
                  Personal Meeting ID
                </Typography>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={0.5}>
                  <Typography variant="subtitle1" fontWeight="800" color="#0f172a" letterSpacing={1}>
                    {personalMeetingId}
                  </Typography>
                  <Tooltip title={copiedPmi ? 'Copied!' : 'Copy Personal Meeting ID'}>
                    <IconButton size="small" onClick={handleCopyPmi} sx={{ color: copiedPmi ? '#16a34a' : '#64748b' }}>
                      {copiedPmi ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </Paper>

            {/* Meetings Card */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #e2e8f0' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="800" color="#0f172a">
                  Meetings
                </Typography>
                <Typography
                  variant="caption"
                  component="span"
                  onClick={() => navigate('/meetings')}
                  sx={{ color: '#0E72ED', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  Visit Meetings
                </Typography>
              </Stack>

              {/* Status / Meetings List Box */}
              {loading ? (
                <Box textAlign="center" py={2}>
                  <CircularProgress size={24} />
                </Box>
              ) : meetings.filter(m => m.status !== 'ended').length === 0 ? (
                <Box
                  sx={{
                    p: 2,
                    mb: 2.5,
                    borderRadius: 2,
                    bgcolor: '#f8fafc',
                    border: '1px solid #f1f5f9',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" fontWeight="700" color="#475569">
                    No Upcoming Meetings
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={1.5} mb={2.5}>
                  {meetings.filter(m => m.status !== 'ended').slice(0, 3).map((m) => (
                    <Box key={m._id || m.meetingCode} sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <Typography variant="subtitle2" fontWeight="700">{m.title || 'Untitled Meeting'}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Code: {m.meetingCode}
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<PlayArrowIcon fontSize="small" />}
                        onClick={() => navigate(`/meeting/${m.meetingCode}`)}
                        sx={{ mt: 1, textTransform: 'none', borderRadius: 10, fontSize: '0.75rem' }}
                      >
                        Join Now
                      </Button>
                    </Box>
                  ))}
                </Stack>
              )}

              {/* Test Audio & Video Button */}
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/settings/audio')}
                sx={{
                  color: '#0E72ED',
                  borderColor: 'rgba(14, 114, 237, 0.3)',
                  bgcolor: 'rgba(14, 114, 237, 0.04)',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 20,
                  py: 1,
                  '&:hover': { bgcolor: 'rgba(14, 114, 237, 0.08)', borderColor: '#0E72ED' },
                }}
              >
                Test Audio and Video
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Floating Support Chat Button */}
      <Fab
        color="primary"
        aria-label="chat support"
        onClick={() => navigate('/chat')}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#0E72ED',
          boxShadow: '0 8px 24px rgba(14, 114, 237, 0.4)',
          '&:hover': { bgcolor: '#0A5BBF' },
        }}
      >
        <ChatIcon />
      </Fab>
    </Box>
  );
}

export default Dashboard;
