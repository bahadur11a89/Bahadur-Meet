import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import styles from './FeaturesSection.module.css';

// Icons
import VideocamIcon from '@mui/icons-material/Videocam';
import ForumIcon from '@mui/icons-material/Forum';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LandscapeIcon from '@mui/icons-material/Landscape';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import EditNoteIcon from '@mui/icons-material/EditNote';

const features = [
  {
    icon: <VideocamIcon fontSize="large" color="primary" />,
    title: 'HD Video Meetings',
    description: 'Connect with your team in crystal-clear high definition video.',
  },
  {
    icon: <ForumIcon fontSize="large" color="primary" />,
    title: 'Team Chat',
    description: 'Persistent chat rooms for seamless team communication.',
  },
  {
    icon: <ScreenShareIcon fontSize="large" color="primary" />,
    title: 'Screen Sharing',
    description: 'Share your screen with participants for better collaboration.',
  },
  {
    icon: <RadioButtonCheckedIcon fontSize="large" color="primary" />,
    title: 'Meeting Recording',
    description: 'Record your meetings to the cloud for future reference.',
  },
  {
    icon: <SmartToyIcon fontSize="large" color="primary" />,
    title: 'AI Meeting Assistant',
    description: 'Get automated summaries, transcripts, and action items.',
  },
  {
    icon: <LandscapeIcon fontSize="large" color="primary" />,
    title: 'Virtual Background',
    description: 'Customize your background for a professional appearance.',
  },
  {
    icon: <GroupWorkIcon fontSize="large" color="primary" />,
    title: 'Breakout Rooms',
    description: 'Split your meeting into smaller groups for focused discussions.',
  },
  {
    icon: <EditNoteIcon fontSize="large" color="primary" />,
    title: 'Live Whiteboard',
    description: 'Collaborate visually with an interactive digital whiteboard.',
  },
];

const FeaturesSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Everything you need to collaborate
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ fontWeight: 400, mb: { xs: 6, md: 8 } }}
        >
          Secure communication, teamwork, AI productivity and enterprise
          collaboration from one platform.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card className={styles.featureCard}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;