import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Videocam,
  VideoCall,
  AddLink,
  ScreenShare,
  Security,
  Speed,
  ArrowForward,
} from '@mui/icons-material';
import LandingNavbar from '../routes/LandingNavbar';
import LandingFooter from '../routes/LandingFooter';
import { useAuth } from '../context/AuthContext';

const PublicMeetPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [meetingCode, setMeetingCode] = useState('');

  const handleStartInstantMeeting = () => {
    const randomCode = 'meet-' + Math.floor(1000 + Math.random() * 9000);
    navigate(`/meeting/${randomCode}`);
  };

  const handleJoinMeeting = (e) => {
    e.preventDefault();
    if (meetingCode.trim()) {
      navigate(`/meeting/${meetingCode.trim()}`);
    }
  };

  const handleScheduleMeeting = () => {
    if (isAuthenticated) {
      navigate('/meetings');
    } else {
      navigate('/login', { state: { from: { pathname: '/meetings' } } });
    }
  };

  const meetFeatures = [
    {
      icon: <Videocam sx={{ fontSize: 36, color: '#0E72ED' }} />,
      title: 'Ultra HD Video & Crystal Audio',
      desc: 'Connect with up to 1,000 active video participants with low latency and clear WebRTC audio.',
    },
    {
      icon: <ScreenShare sx={{ fontSize: 36, color: '#4CAF50' }} />,
      title: 'Instant Screen & Tab Sharing',
      desc: 'Share your whole desktop, specific application windows, or browser tabs with a single click.',
    },
    {
      icon: <Security sx={{ fontSize: 36, color: '#9C27B0' }} />,
      title: 'End-to-End Security',
      desc: 'Meetings are protected with 256-bit AES encryption, waiting rooms, and host permission controls.',
    },
    {
      icon: <Speed sx={{ fontSize: 36, color: '#FF9800' }} />,
      title: 'No App Installation Required',
      desc: 'Join meetings directly inside any modern web browser without downloading heavy software.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <LandingNavbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: 'linear-gradient(135deg, #0b5cff 0%, #002b80 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                icon={<Videocam sx={{ color: '#00f2fe !important' }} />}
                label="BAHADUR MEET CONFERENCING"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  mb: 2.5,
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: 1,
                }}
              />
              <Typography
                variant="h2"
                fontWeight="800"
                sx={{ fontSize: { xs: '2.25rem', md: '3.5rem' }, mb: 2.5, lineHeight: 1.15 }}
              >
                Frictionless Video Meetings <br />
                For Everyone, Anywhere.
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400, maxWidth: 580, lineHeight: 1.6 }}>
                Host instant video meetings, share your screen, collaborate in real-time, or join an existing meeting with a code.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<VideoCall />}
                  onClick={handleStartInstantMeeting}
                  sx={{
                    bgcolor: 'white',
                    color: '#0b5cff',
                    '&:hover': { bgcolor: '#f0f4ff' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    borderRadius: 20,
                  }}
                >
                  Start Instant Meeting
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleScheduleMeeting}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.4)',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.05rem',
                    borderRadius: 20,
                  }}
                >
                  Schedule a Meeting
                </Button>
              </Stack>
            </Grid>

            {/* Quick Join Card */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  color: '#0f172a',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={1}>
                  Join a Meeting
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Enter the meeting code or link provided by the host.
                </Typography>

                <Box component="form" onSubmit={handleJoinMeeting}>
                  <TextField
                    fullWidth
                    placeholder="Enter meeting code (e.g. meet-101)"
                    value={meetingCode}
                    onChange={(e) => setMeetingCode(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddLink sx={{ color: '#0E72ED' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2.5 }}
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!meetingCode.trim()}
                    endIcon={<ArrowForward />}
                    sx={{ py: 1.4, fontWeight: 700, borderRadius: 2 }}
                  >
                    Join Meeting Now
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="overline" color="primary.main" fontWeight="bold" letterSpacing={1.5}>
            FEATURES
          </Typography>
          <Typography variant="h3" fontWeight="bold" mt={0.5}>
            Built for Modern Remote Collaboration
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          {meetFeatures.map((f, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  borderColor: '#e2e8f0',
                  transition: '0.3s',
                  '&:hover': { boxShadow: 4, transform: 'translateY(-4px)', borderColor: '#0E72ED' },
                }}
              >
                <CardContent sx={{ p: 3.5 }}>
                  <Box mb={2}>{f.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1.1rem' }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {f.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Bottom CTA */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Videocam sx={{ fontSize: 44, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Start Your Meeting?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 540, mx: 'auto' }}>
            No credit card or setup required. Start an instant meeting in seconds.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartInstantMeeting}
            sx={{ px: 4, py: 1.5, fontSize: '1.05rem', fontWeight: 700, borderRadius: 20 }}
          >
            Launch Instant Meeting
          </Button>
        </Container>
      </Box>

      <LandingFooter />
    </Box>
  );
};

export default PublicMeetPage;
