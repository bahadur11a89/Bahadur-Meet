import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import FileCard from '../FileCard/FileCard';
import FileFilters from '../FileFilters/FileFilters';

const demoFiles = [
  { name: 'Q4_Report.pdf', size: '2.1 MB', lastModified: '2h ago', owner: 'Alice', ownerAvatar: '/static/images/avatar/1.jpg', tags: ['report', 'q4'] },
  { name: 'API_Spec_v2.docx', size: '850 KB', lastModified: 'Yesterday', owner: 'Bob', ownerAvatar: '/static/images/avatar/2.jpg', tags: ['api', 'spec'] },
  { name: 'Budget.xlsx', size: '1.2 MB', lastModified: '3d ago', owner: 'Charlie', ownerAvatar: '/static/images/avatar/3.jpg', tags: ['finance'] },
  { name: 'Marketing_Deck.pptx', size: '5.4 MB', lastModified: '1w ago', owner: 'Alice', ownerAvatar: '/static/images/avatar/1.jpg', tags: ['marketing'] },
  { name: 'Assets.zip', size: '25 MB', lastModified: '1w ago', owner: 'David', ownerAvatar: '/static/images/avatar/4.jpg', tags: ['design'] },
  { name: 'header_logo.png', size: '120 KB', lastModified: '2w ago', owner: 'Eve', ownerAvatar: '/static/images/avatar/5.jpg', tags: ['logo', 'branding'] },
];

const SharedFiles = () => {
  const [view, setView] = useState('grid');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Shared Files</Typography>
      <FileFilters view={view} onViewChange={handleViewChange} />
      <Grid container spacing={3}>
        {demoFiles.map((file, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={view === 'grid' ? 3 : 12}>
            <FileCard file={file} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SharedFiles;