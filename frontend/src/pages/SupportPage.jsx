import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LandingNavbar from '../routes/LandingNavbar';
import LandingFooter from '../routes/LandingFooter';

const faqs = [
  { q: 'How do I start or join a Bahadur Meet meeting?', a: 'Click on "Sign Up Free" or "Sign In" to access your dashboard. You can create an instant meeting room code or paste a meeting code to join immediately.' },
  { q: 'Is Bahadur Meet free for personal use?', a: 'Yes! The Basic plan offers free HD video meetings with up to 100 participants and interactive features.' },
  { q: 'How do I share my screen during a meeting?', a: 'Inside the meeting room, click the "Screen Share" icon in the control bar to select your monitor, application window, or browser tab.' },
  { q: 'What browser is required for WebRTC meetings?', a: 'Bahadur Meet runs directly in Chrome, Firefox, Edge, and Safari with no plugins or downloads needed.' },
];

const SupportPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar />
      <Box sx={{ flexGrow: 1, py: { xs: 8, md: 12 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" fontWeight={800} color="#0f172a" gutterBottom>
              Bahadur Meet Support & Help Center
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Find answers, technical documentation, and contact our 24/7 enterprise support team.
            </Typography>
          </Box>

          <Grid container spacing={3} mb={8}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <HelpOutlineIcon sx={{ fontSize: 48, color: '#0E72ED', mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Help Center</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>Browse step-by-step user guides and tutorials.</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <LibraryBooksIcon sx={{ fontSize: 48, color: '#4CAF50', mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Developer Docs</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>Explore API reference documentation & WebRTC SDKs.</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: 'center', height: '100%', borderRadius: 3 }}>
                <CardContent>
                  <SupportAgentIcon sx={{ fontSize: 48, color: '#9C27B0', mb: 1 }} />
                  <Typography variant="h6" fontWeight="bold">Contact Support</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>Talk to our technical support team +91 9648387996.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h4" fontWeight="bold" mb={4}>Frequently Asked Questions</Typography>
          {faqs.map((faq, idx) => (
            <Accordion key={idx} sx={{ mb: 1.5, borderRadius: 2, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
      <LandingFooter />
    </Box>
  );
};

export default SupportPage;
