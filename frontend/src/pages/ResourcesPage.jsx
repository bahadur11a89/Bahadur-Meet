import React from 'react';
import { Box } from '@mui/material';
import LandingNavbar from '../routes/LandingNavbar';
import FeaturesSection from '../routes/FeaturesSection';
import LandingFooter from '../routes/LandingFooter';

const ResourcesPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <FeaturesSection />
      </Box>
      <LandingFooter />
    </Box>
  );
};

export default ResourcesPage;
