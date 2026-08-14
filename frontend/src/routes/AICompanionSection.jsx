import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styles from './AICompanionSection.module.css';

const features = [
  'Meeting Summary',
  'Smart Notes',
  'Action Items',
  'AI Chat',
  'Email Drafts',
  'Calendar Suggestions',
];

const AICompanionSection = () => {
  const theme = useTheme();

  return (
    <Box
      className={styles.aiSectionContainer}
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.info.light} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={8} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4 }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Column: Illustration Placeholder */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  height: { xs: 250, md: 400 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.palette.primary.dark,
                  borderRadius: 3,
                  color: 'white',
                }}
              >
                <Typography variant="h5">Large Illustration Placeholder</Typography>
              </Paper>
            </Grid>

            {/* Right Column: Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}
              >
                AI that works with your meetings.
              </Typography>
              <List>
                {features.map((feature) => (
                  <ListItem key={feature} disableGutters>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ variant: 'h6', color: 'text.secondary' }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 4, py: 1.5 }}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AICompanionSection;