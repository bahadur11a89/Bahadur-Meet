import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import BusinessIcon from '@mui/icons-material/Business';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const solutions = [
  {
    icon: <SchoolIcon sx={{ fontSize: 32, color: '#0E72ED' }} />,
    title: 'Education & E-Learning',
    subtitle: 'Virtual Classrooms & Academic Collaboration',
    description: 'Transform remote and hybrid learning with interactive breakout rooms, real-time quizzes, automated attendance, and LMS integration.',
    badge: 'Popular in EdTech',
    stats: '99.9% Uptime for Universities',
  },
  {
    icon: <LocalHospitalIcon sx={{ fontSize: 32, color: '#E53935' }} />,
    title: 'Healthcare & Telehealth',
    subtitle: 'HIPAA-Compliant Virtual Consultations',
    description: 'Secure HD video consultations between doctors and patients with medical record integration, encrypted video streams, and waiting rooms.',
    badge: 'HIPAA & GDPR Certified',
    stats: '10M+ Patient Consultations',
  },
  {
    icon: <AccountBalanceIcon sx={{ fontSize: 32, color: '#43A047' }} />,
    title: 'Financial Services',
    subtitle: 'Encrypted Advisory & Wealth Management',
    description: 'Provide high-touch financial advice, secure document review, and end-to-end encrypted client consultations with audit logging.',
    badge: 'Bank-Grade Security',
    stats: '256-Bit AES Encryption',
  },
  {
    icon: <GavelIcon sx={{ fontSize: 32, color: '#FB8C00' }} />,
    title: 'Government & Public Sector',
    subtitle: 'FedRAMP-Certified Secure Public Meetings',
    description: 'Empower municipal councils and government agencies with compliant public hearings, closed executive sessions, and live streaming.',
    badge: 'FedRAMP Certified',
    stats: 'Used by 500+ Public Agencies',
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 32, color: '#8E24AA' }} />,
    title: 'Enterprise & Remote Work',
    subtitle: 'Global Team Collaboration Platform',
    description: 'Unify large distributed workforces with enterprise single sign-on (SSO), centralized administration, and AI meeting summaries.',
    badge: 'Enterprise Choice',
    stats: 'Scale up to 50,000 users',
  },
  {
    icon: <EventAvailableIcon sx={{ fontSize: 32, color: '#00ACC1' }} />,
    title: 'Hybrid Events & Conferences',
    subtitle: 'Large-Scale Virtual Keynotes & Webinars',
    description: 'Host global product launches, trade shows, and interactive keynotes with live Q&A, audience polling, and sponsor booths.',
    badge: 'Broadcast Ready',
    stats: 'Up to 50,000 Attendees',
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 32, color: '#3949AB' }} />,
    title: 'Customer Care & Support',
    subtitle: 'Face-to-Face Video Helpdesk',
    description: 'Elevate customer service with one-click video escalation, remote screen control diagnostics, and instant chat handoffs.',
    badge: 'High CSAT Impact',
    stats: '35% Faster Resolution',
  },
];

const SolutionsSection = () => {
  return (
    <Box
      id="solutions"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#f8fafc',
        color: '#0f172a',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
          <Chip
            label="INDUSTRY SOLUTIONS"
            sx={{
              backgroundColor: 'rgba(14, 114, 237, 0.1)',
              color: '#0E72ED',
              fontWeight: 700,
              mb: 2,
              px: 1,
            }}
          />
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '2.75rem' }, color: '#0f172a' }}
          >
            Tailored Solutions for Every Industry
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: '#475569', maxWidth: 750, mx: 'auto', fontWeight: 400 }}
          >
            Discover how Bahadur Meet powers specialized video workflows for education, healthcare, finance, government, and global enterprises.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {solutions.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 24px rgba(14, 114, 237, 0.12)',
                    borderColor: '#0E72ED',
                  },
                }}
              >
                <CardContent sx={{ p: 3.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2.5,
                        backgroundColor: 'rgba(14, 114, 237, 0.06)',
                        display: 'inline-flex',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Chip size="small" label={item.badge} color="primary" variant="outlined" sx={{ fontSize: '0.75rem', fontWeight: 700 }} />
                  </Stack>

                  <Typography variant="h6" fontWeight="bold" color="#0f172a" gutterBottom sx={{ fontSize: '1.2rem' }}>
                    {item.title}
                  </Typography>

                  <Typography variant="caption" sx={{ color: '#0E72ED', fontWeight: 600, mb: 1.5, display: 'block' }}>
                    {item.subtitle}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#64748b', mb: 3, flexGrow: 1, lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>

                  <Box sx={{ pt: 2, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 700 }}>
                      ✓ {item.stats}
                    </Typography>
                    <Button
                      size="small"
                      endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                      sx={{ color: '#0E72ED', textTransform: 'none', fontWeight: 700, p: 0, '&:hover': { color: '#0A5BBF' } }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionsSection;
