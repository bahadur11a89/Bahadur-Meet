import React from 'react';
import { Box, Typography, Container, Grid, Paper, useTheme } from '@mui/material';
import styles from './TrustedCompanies.module.css';

const TrustedCompanies = () => {
  const theme = useTheme();

  const companyLogos = [
    'Google Workspace',
    'Microsoft 365',
    'Slack',
    'Dropbox',
    'Spotify',
    'Adobe',
    'Uber',
    'Salesforce',
    'Zoom Partner',
    'GitHub',
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Trusted by millions of people and organizations worldwide
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{ fontWeight: 400, mb: { xs: 6, md: 8 } }}
        >
          Designed for startups, businesses, enterprises, education and remote
          teams.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {companyLogos.map((company, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Paper
                elevation={2}
                className={styles.logoCard}
                sx={{
                  p: 2,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.palette.grey[50],
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  color="text.secondary"
                >
                  {company}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustedCompanies;