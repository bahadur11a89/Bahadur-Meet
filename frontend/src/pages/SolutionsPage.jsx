import React from 'react';
import { Box } from '@mui/material';
import LandingNavbar from '../routes/LandingNavbar';
import SolutionsSection from '../routes/SolutionsSection';
import LandingFooter from '../routes/LandingFooter';

const SolutionsPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <SolutionsSection />
      </Box>
      <LandingFooter />
    </Box>
  );
};

export default SolutionsPage;
