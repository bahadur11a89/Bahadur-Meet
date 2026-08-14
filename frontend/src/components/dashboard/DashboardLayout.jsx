import React from 'react';
import { Box } from '@mui/material';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
      <Box sx={{ width: { xs: 0, md: 240 }, flexShrink: { md: 0 }, bgcolor: 'background.paper', borderRight: { md: '1px solid rgba(0, 0, 0, 0.12)' } }} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: 'calc(100% - 240px)' } }}>
        <Box sx={{ height: 64, display: { xs: 'none', md: 'block' } }} />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
