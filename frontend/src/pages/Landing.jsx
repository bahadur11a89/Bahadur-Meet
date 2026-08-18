import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  Videocam,
  ScreenShare,
  Chat,
  Mic,
  AutoAwesome,
  Security,
  ExpandMore,
  CheckCircleOutline,
} from '@mui/icons-material';
import ProductsSection from '../routes/ProductsSection';
import SolutionsSection from '../routes/SolutionsSection';
import LandingNavbar from '../routes/LandingNavbar';
import LandingFooter from '../routes/LandingFooter';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const features = [
    { icon: <Videocam fontSize="large" color="primary" />, title: 'HD Video Meetings', desc: 'Crystal clear video and audio quality with adaptive network optimization.' },
    { icon: <ScreenShare fontSize="large" color="primary" />, title: 'Screen Sharing', desc: 'Share your screen, browser tabs, or specific application windows instantly.' },
    { icon: <Chat fontSize="large" color="primary" />, title: 'Real-time Chat', desc: 'In-meeting text messaging, file attachments, and emoji reactions.' },
    { icon: <Mic fontSize="large" color="primary" />, title: 'Meeting Recording', desc: 'Record meetings locally or to cloud storage for easy sharing.' },
    { icon: <AutoAwesome fontSize="large" color="primary" />, title: 'AI Meeting Assistant', desc: 'Automatic summaries, key decisions, action items, and live transcripts.' },
    { icon: <Security fontSize="large" color="primary" />, title: 'Enterprise Security', desc: 'End-to-end encryption, waiting rooms, and role-based access control.' },
  ];

  const pricingPlans = [
    { title: 'Free', price: '$0', sub: 'For personal use', features: ['Up to 100 participants', '40-minute group limit', '1-on-1 unlimited meetings', 'HD Video & Audio'], btnText: 'Sign Up Free', variant: 'outlined' },
    { title: 'Pro', price: '$14.99', sub: 'For small teams', features: ['Up to 150 participants', '30-hour meeting duration', 'Cloud Recording (5GB)', 'AI Assistant (Trial)'], btnText: 'Start Pro Trial', variant: 'contained' },
    { title: 'Business', price: '$19.99', sub: 'For growing businesses', features: ['Up to 300 participants', 'Unlimited Cloud Recording', 'Single Sign-On (SSO)', 'Admin Management Portal'], btnText: 'Buy Business', variant: 'outlined' },
    { title: 'Enterprise', price: 'Custom', sub: 'For large organizations', features: ['Up to 1000 participants', 'Unlimited Cloud Storage', 'Dedicated Support & SLA', 'Custom Branding'], btnText: 'Contact Sales', variant: 'outlined' },
  ];

  const faqs = [
    { q: 'Is Zoom Enterprise free to try?', a: 'Yes! Our Free plan provides complete HD video conferencing for up to 100 participants with 40-minute limits.' },
    { q: 'How secure are the meetings?', a: 'All meetings are protected with 256-bit AES encryption, host controls, waiting rooms, and optional passcode locks.' },
    { q: 'Does WebRTC require any installation?', a: 'No downloads required! Meetings run directly inside any modern web browser via native WebRTC.' },
    { q: 'How does the AI Assistant work?', a: 'The AI Assistant automatically transcribes meeting audio in real-time and extracts key decisions and action items.' },
  ];

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, #0b5cff 0%, #002b80 100%)', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip label="Next-Gen Video Platform" sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white', mb: 2, fontWeight: 'bold' }} />
              <Typography variant="h2" fontWeight="800" sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' }, mb: 2, lineHeight: 1.15 }}>
                Connect. <br />
                Collaborate. <br />
                Create.
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontWeight: 400, maxWidth: 540 }}>
                Powerful video meetings, team chat, screen sharing, and AI assistants built for teams, businesses, and organizations.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: '#0b5cff', '&:hover': { bgcolor: '#f0f4ff' }, px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }} onClick={() => navigate('/register')}>
                  Start a Meeting
                </Button>
                <Button variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }, px: 4, py: 1.5, fontSize: '1.1rem' }} onClick={() => navigate('/register')}>
                  Sign Up Free
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 320, md: 400 },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              >
                <img
                  src="/user_portrait.jpg"
                  alt="Bahadur Raj"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container id="features" maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="overline" color="primary.main" fontWeight="bold" letterSpacing={1.5}>
            WHY CHOOSE US
          </Typography>
          <Typography variant="h3" fontWeight="bold" mt={1}>
            Everything You Need for Remote Collaboration
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((f, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: 3, transition: '0.3s', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box mb={2}>{f.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Products Section */}
      <ProductsSection />

      {/* Solutions Section */}
      <SolutionsSection />

      {/* Pricing Section */}
      <Box id="pricing" sx={{ bgcolor: 'grey.50', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="primary.main" fontWeight="bold" letterSpacing={1.5}>
              PRICING PLANS
            </Typography>
            <Typography variant="h3" fontWeight="bold" mt={1}>
              Simple, Transparent Pricing
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="stretch">
            {pricingPlans.map((plan, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card variant={plan.variant === 'contained' ? 'elevation' : 'outlined'} elevation={plan.variant === 'contained' ? 8 : 0} sx={{ height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column', borderColor: plan.variant === 'contained' ? 'primary.main' : undefined }}>
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold">{plan.title}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>{plan.sub}</Typography>
                    <Typography variant="h3" fontWeight="800" color="primary.main" mb={3}>{plan.price}</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Stack spacing={1.5}>
                      {plan.features.map((ft, fIdx) => (
                        <Stack direction="row" spacing={1} alignItems="center" key={fIdx}>
                          <CheckCircleOutline color="primary" fontSize="small" />
                          <Typography variant="body2">{ft}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ p: 4, pt: 0 }}>
                    <Button fullWidth variant={plan.variant} color="primary" size="large" onClick={() => navigate('/register')}>
                      {plan.btnText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container id="faq" maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold">Frequently Asked Questions</Typography>
        </Box>
        {faqs.map((faq, idx) => (
          <Accordion key={idx} expanded={activeFaq === idx} onChange={() => setActiveFaq(activeFaq === idx ? null : idx)} sx={{ mb: 1, borderRadius: 2, '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="bold">{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Footer */}
      <LandingFooter />
    </Box>
  );
}
