import React from 'react';
import { Box } from '@mui/material';
import LandingNavbar from '../routes/LandingNavbar';
import ProductsSection from '../routes/ProductsSection';
import LandingFooter from '../routes/LandingFooter';

const ProductsPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingNavbar />
      <Box sx={{ flexGrow: 1 }}>
        <ProductsSection />
      </Box>
      <LandingFooter />
    </Box>
  );
};

export default ProductsPage;
