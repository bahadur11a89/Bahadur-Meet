import React from 'react';
import { Box } from '@mui/material';
import LandingNavbar from '../routes/LandingNavbar';
import PricingPreview from '../routes/PricingPreview';
import LandingFooter from '../routes/LandingFooter';

const PricingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <PricingPreview />
      </Box>
      <LandingFooter />
    </Box>
  );
};

export default PricingPage;
