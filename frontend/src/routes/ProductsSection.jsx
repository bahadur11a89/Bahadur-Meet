import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';

// Icons
import VideocamIcon from '@mui/icons-material/Videocam';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BrushIcon from '@mui/icons-material/Brush';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';

const products = [
  {
    icon: <VideocamIcon sx={{ fontSize: 36, color: '#0E72ED' }} />,
    title: 'Bahadur HD Meetings',
    tagline: 'Video & Audio Conferencing',
    description: 'Ultra low-latency WebRTC video conferencing for up to 1,000 active video participants with HD screen sharing and active speaker tracking.',
    badge: 'Core Platform',
    features: ['1080p HD Video', 'Screen & Tab Share', 'Breakout Rooms'],
  },
  {
    icon: <ChatIcon sx={{ fontSize: 36, color: '#4CAF50' }} />,
    title: 'Bahadur Team Chat',
    tagline: 'Instant Collaboration',
    description: 'Persistent team messaging with public and private channels, file attachments, code snippets, thread replies, and rich emoji reactions.',
    badge: 'Real-time Messaging',
    features: ['Channels & DMs', 'File Sharing', 'Searchable History'],
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 36, color: '#9C27B0' }} />,
    title: 'Bahadur AI Companion',
    tagline: 'Smart Meeting Intelligence',
    description: 'Real-time automated audio transcription, multi-language translation, key takeaway extraction, and action item generation.',
    badge: 'AI Powered',
    features: ['Live Transcription', 'Auto Summaries', 'Action Items'],
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 36, color: '#FF9800' }} />,
    title: 'Bahadur Cloud Phone',
    tagline: 'Enterprise VoIP System',
    description: 'Cloud-based business telephony with virtual extensions, international calling, call delegation, IVR auto-attendant, and voicemail-to-text.',
    badge: 'Business Phone',
    features: ['Global PSTN', 'Auto Attendant', 'Voicemail Transcripts'],
  },
  {
    icon: <BrushIcon sx={{ fontSize: 36, color: '#E91E63' }} />,
    title: 'Bahadur Digital Whiteboard',
    tagline: 'Visual Canvas & Diagrams',
    description: 'Infinite collaborative digital whiteboard for brain-storming, sticky notes, freehand drawing, flowcharts, and sticky wireframing.',
    badge: 'Visual Collaboration',
    features: ['Infinite Canvas', 'Sticky Notes & Shapes', 'Real-time Cursors'],
  },
  {
    icon: <MeetingRoomIcon sx={{ fontSize: 36, color: '#00BCD4' }} />,
    title: 'Bahadur Rooms',
    tagline: 'Conference Room Software',
    description: 'Transform physical conference spaces into one-touch video meeting rooms with dual display support and wireless screen sharing.',
    badge: 'Room Systems',
    features: ['One-Touch Join', 'Wireless Sharing', 'SIP/H.323 Support'],
  },
  {
    icon: <LiveTvIcon sx={{ fontSize: 36, color: '#3F51B5' }} />,
    title: 'Bahadur Webinars & Events',
    tagline: 'Broadcasting & Keynotes',
    description: 'Host large-scale virtual keynotes, product launches, and multi-session conferences for up to 50,000 view-only attendees with live Q&A.',
    badge: 'Live Events',
    features: ['Up to 50k Attendees', 'Moderated Q&A', 'Live Polling'],
  },
  {
    icon: <CodeIcon sx={{ fontSize: 36, color: '#673AB7' }} />,
    title: 'Bahadur Developer Platform',
    tagline: 'SDKs & REST APIs',
    description: 'Embed WebRTC video calling, chat, and audio streams into your own web and mobile applications using client SDKs and Webhooks.',
    badge: 'For Developers',
    features: ['Video SDKs', 'REST APIs & Webhooks', 'OAuth2 Auth'],
  },
];

const ProductsSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  const filteredProducts = products.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.tagline.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.badge.toLowerCase().includes(q) ||
      item.features.some((f) => f.toLowerCase().includes(q))
    );
  });

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (val) {
      navigate(`/products?search=${encodeURIComponent(val)}`, { replace: true });
    } else {
      navigate('/products', { replace: true });
    }
  };

  const handleClearSearch = () => {
    navigate('/products', { replace: true });
  };

  return (
    <Box
      id="products"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: '#ffffff',
        color: '#1a1a1a',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={{ xs: 5, md: 6 }}>
          <Chip
            label="SOFTWARE PRODUCTS & PLATFORM"
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
            Explore Bahadur Meet Products
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: '#475569', maxWidth: 750, mx: 'auto', fontWeight: 400, mb: 4 }}
          >
            Comprehensive enterprise products designed to deliver frictionless video, voice, chat, AI, and developer tools.
          </Typography>

          {/* Interactive Search Field */}
          <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <TextField
              fullWidth
              size="medium"
              placeholder="Search products, AI, chat, meetings..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#0E72ED' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 20, bgcolor: '#f8fafc' },
              }}
            />

            {searchQuery && (
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Showing {filteredProducts.length} results for "<strong>{searchQuery}</strong>"
                </Typography>
                <Button size="small" onClick={handleClearSearch} sx={{ textTransform: 'none', fontWeight: 700 }}>
                  Clear Filter
                </Button>
              </Stack>
            )}
          </Box>
        </Box>

        <Grid container spacing={3.5}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    borderColor: '#e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, boxShadow 0.3s ease, borderColor 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(14, 114, 237, 0.12)',
                      borderColor: '#0E72ED',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                      <Chip
                        size="small"
                        label={item.badge}
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(14, 114, 237, 0.08)',
                          color: '#0E72ED',
                        }}
                      />
                    </Stack>

                    <Typography variant="h6" fontWeight="bold" color="#0f172a" gutterBottom sx={{ fontSize: '1.15rem' }}>
                      {item.title}
                    </Typography>

                    <Typography variant="caption" sx={{ color: '#0E72ED', fontWeight: 700, mb: 1.5, display: 'block' }}>
                      {item.tagline}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5, flexGrow: 1, lineHeight: 1.6 }}>
                      {item.description}
                    </Typography>

                    <Box sx={{ pt: 2, borderTop: '1px solid #f1f5f9' }}>
                      <Stack spacing={0.8} mb={2}>
                        {item.features.map((feat, fIdx) => (
                          <Typography key={fIdx} variant="caption" sx={{ color: '#334155', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <span style={{ color: '#0E72ED', fontWeight: 'bold' }}>✓</span> {feat}
                          </Typography>
                        ))}
                      </Stack>

                      <Button
                        fullWidth
                        size="small"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                        sx={{
                          color: '#0E72ED',
                          textTransform: 'none',
                          fontWeight: 700,
                          justifyContent: 'space-between',
                          px: 1,
                          '&:hover': { backgroundColor: 'rgba(14, 114, 237, 0.06)' },
                        }}
                      >
                        Explore Product
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box textAlign="center" py={8} bgcolor="#f8fafc" borderRadius={4} border="1px dashed #cbd5e1">
                <Typography variant="h6" color="#0f172a" fontWeight="bold" gutterBottom>
                  No products found for "{searchQuery}"
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Try searching for keywords like "Video", "Chat", "AI", "Whiteboard", or "Phone".
                </Typography>
                <Button variant="contained" onClick={handleClearSearch} sx={{ textTransform: 'none', fontWeight: 700 }}>
                  Show All Products
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductsSection;