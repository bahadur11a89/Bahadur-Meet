import React from 'react';
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
  Paper,
} from '@mui/material';
import {
  AutoAwesome,
  Subject,
  CheckCircleOutline,
  Translate,
  Analytics,
  Mic,
  ArrowForward,
} from '@mui/icons-material';
import LandingNavbar from '../routes/LandingNavbar';
import LandingFooter from '../routes/LandingFooter';
import { useAuth } from '../context/AuthContext';

const PublicAiPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleTryAi = () => {
    if (isAuthenticated) {
      navigate('/ai-assistant');
    } else {
      navigate('/login', { state: { from: { pathname: '/ai-assistant' } } });
    }
  };

  const aiFeatures = [
    {
      icon: <Mic sx={{ fontSize: 36, color: '#0E72ED' }} />,
      title: 'Real-time Live Transcription',
      desc: 'Accurately convert speech to text in real-time during your video meetings with active speaker detection.',
    },
    {
      icon: <Subject sx={{ fontSize: 36, color: '#9C27B0' }} />,
      title: 'Automated Meeting Summaries',
      desc: 'Instant concise summaries generated automatically as soon as your meeting finishes.',
    },
    {
      icon: <CheckCircleOutline sx={{ fontSize: 36, color: '#4CAF50' }} />,
      title: 'Action Item Extraction',
      desc: 'AI automatically identifies tasks, assignees, and deadlines mentioned throughout the discussion.',
    },
    {
      icon: <Translate sx={{ fontSize: 36, color: '#FF9800' }} />,
      title: 'Multi-Language Translation',
      desc: 'Break down language barriers with instant multi-lingual captions and translated meeting notes.',
    },
    {
      icon: <Analytics sx={{ fontSize: 36, color: '#E91E63' }} />,
      title: 'Meeting Insights & Analytics',
      desc: 'Analyze participation rates, talk time distribution, and overall team engagement metrics.',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 36, color: '#00BCD4' }} />,
      title: 'Smart Export & Integration',
      desc: 'Export reports seamlessly to Markdown, PDF, or share summary links with your workspace team.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <LandingNavbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0b5cff 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                icon={<AutoAwesome sx={{ color: '#00f2fe !important' }} />}
                label="BAHADUR AI COMPANION"
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
                Supercharge Your Meetings <br />
                With AI Intelligence.
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400, maxWidth: 580, lineHeight: 1.6 }}>
                Automate note-taking, capture key decisions, extract action items, and get instant summaries so you can focus on meaningful collaboration.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={handleTryAi}
                  sx={{
                    bgcolor: '#0E72ED',
                    color: 'white',
                    '&:hover': { bgcolor: '#0b5cff' },
                    px: 4,
                    py: 1.5,
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    borderRadius: 20,
                  }}
                >
                  Try AI Assistant
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/register')}
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
                  Sign Up Free
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <AutoAwesome sx={{ color: '#00f2fe' }} />
                    <Typography variant="subtitle1" fontWeight="bold" color="white">
                      Live AI Summary Sample
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                    "Team aligned on deployment schedule for Q3 enterprise features. WebRTC peer connection handler was optimized for mobile browsers."
                  </Typography>
                  <Box sx={{ pt: 1, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    <Chip label="Action Item" size="small" sx={{ bgcolor: '#4CAF50', color: 'white', fontWeight: 700, mr: 1 }} />
                    <Typography variant="caption" color="rgba(255,255,255,0.8)">
                      Alex to verify JWT interceptors by Friday
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="overline" color="primary.main" fontWeight="bold" letterSpacing={1.5}>
            CAPABILITIES
          </Typography>
          <Typography variant="h3" fontWeight="bold" mt={0.5}>
            Everything AI Brings to Your Workspace
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          {aiFeatures.map((f, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
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
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
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

      {/* Bottom CTA Banner */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <AutoAwesome sx={{ fontSize: 44, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Experience AI-Powered Meetings?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 540, mx: 'auto' }}>
            Start saving hours on meeting summaries and follow-ups with Bahadur AI.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleTryAi}
            sx={{ px: 4, py: 1.5, fontSize: '1.05rem', fontWeight: 700, borderRadius: 20 }}
          >
            Launch AI Assistant
          </Button>
        </Container>
      </Box>

      <LandingFooter />
    </Box>
  );
};

export default PublicAiPage;
