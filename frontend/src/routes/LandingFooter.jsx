import React from 'react';
import { Box, Typography, Grid, Link, Container, IconButton, Stack, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PhoneIcon from '@mui/icons-material/Phone';

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About',
      links: [
        'Bahadur Meet Blog',
        'Customers',
        'Our Team',
        'Careers',
        'Integrations',
        'Partners',
        'Investors',
        'Press',
        'Sustainability & ESG',
        'Bahadur Meet Cares',
        'Media Kit',
        'How To Videos',
        'Developer Platform',
        'Bahadur Meet Ventures',
        'Bahadur Meet Merchandise Store',
      ],
    },
    {
      title: 'Download',
      links: [
        'Bahadur Meet Workplace App',
        'Bahadur Meet Rooms App',
        'Bahadur Meet Rooms Controller',
        'Browser Extension',
        'Outlook Plug-in',
        'iPhone/iPad App',
        'Android App',
        'Bahadur Meet Virtual Backgrounds',
      ],
    },
    {
      title: 'Sales',
      links: [
        '+91 9648387996 Click to call',
        'Contact Sales',
        'Plans & Pricing',
        'Request a Demo',
        'Webinars and Events',
        'Bahadur Meet Experience Center',
        'Bahadur Meet for Startups',
      ],
    },
    {
      title: 'Support',
      links: [
        'Support',
        'Test Bahadur Meet',
        'Account',
        'Support Center',
        'Learning Center',
        'Bahadur Meet Community',
        'Technical Content Library',
        'Feedback',
        'Contact Us',
        'Accessibility',
        'Developer Support',
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#0b1329',
        color: '#ffffff',
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 6 },
        borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Header Utilities */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={3}
          sx={{ pb: 4, mb: 6, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}
        >
          {/* Logo & Tagline */}
          <Stack direction="row" spacing={2} alignItems="center">
            <img src="/logo_b.png" alt="Bahadur Meet Logo" style={{ height: 44, width: 44, borderRadius: 10 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                Bahadur Meet
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Get the most out of Bahadur Meet
              </Typography>
            </Box>
          </Stack>

          {/* Controls: Language, Currency, Phone, Download Center */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              sx={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', borderRadius: 20, px: 2 }}
            >
              Download Center
            </Button>
            
            <Stack direction="row" spacing={1} alignItems="center">
              <LanguageIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.7)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Language: English
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <AttachMoneyIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.7)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Currency: US Dollar $
              </Typography>
            </Stack>

            <Button
              href="tel:+919648387996"
              startIcon={<PhoneIcon sx={{ fontSize: 16 }} />}
              sx={{ color: '#60a5fa', textTransform: 'none', fontWeight: 600, fontSize: '0.85rem' }}
            >
              Get in touch: +91 9648387996
            </Button>
          </Stack>
        </Stack>

        {/* Multi-Column Links */}
        <Grid container spacing={4}>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: '#ffffff', mb: 2, fontSize: '1rem' }}>
                {section.title}
              </Typography>
              <Box>
                {section.links.map((link, index) => (
                  <Link
                    href={link.includes('9648387996') ? 'tel:+919648387996' : '#'}
                    color="inherit"
                    underline="hover"
                    display="block"
                    key={index}
                    sx={{
                      mb: 1,
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.65)',
                      transition: '0.2s',
                      '&:hover': { color: '#60a5fa' },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Legal Statement & Copyright */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            pt: { xs: 4, md: 5 },
            borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: { xs: 'center', md: 'left' } }}>
            Privacy, Security, Legal Policies, and Modern Slavery Act Transparency Statement
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.8rem', textAlign: { xs: 'center', md: 'left' } }}>
              Copyright &copy; {currentYear} Bahadur Meet Communications, Inc. All rights reserved. |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Terms</Link> |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Privacy</Link> |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Trust Center</Link> |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Acceptable Use Guidelines</Link> |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Legal & Compliance</Link> |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Your Privacy Choices</Link> |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Cookies Settings</Link> |{' '}
              <Link href="#" sx={{ color: 'rgba(255,255,255,0.7)', mx: 0.5, textDecoration: 'none', '&:hover': { color: '#ffffff' } }}>Site Map</Link>
            </Typography>

            <Stack direction="row" spacing={1}>
              <IconButton component="a" href="https://www.linkedin.com/in/raj-bahadur11/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#0077b5' } }}><LinkedInIcon /></IconButton>
              <IconButton component="a" href="https://github.com/bahadur11a89" target="_blank" rel="noopener noreferrer" aria-label="GitHub" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#ffffff' } }}><GitHubIcon /></IconButton>
              <IconButton component="a" href="https://www.youtube.com/@Bahadur-Ai" target="_blank" rel="noopener noreferrer" aria-label="YouTube" sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#FF0000' } }}><YouTubeIcon /></IconButton>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingFooter;