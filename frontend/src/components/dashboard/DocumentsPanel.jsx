import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DocumentCard from '../DocumentCard/DocumentCard';

const demoDocs = [
  { title: 'Meeting Notes - Q4 Kickoff', lastUpdated: '3h ago', status: 'Review' },
  { title: 'Project Proposal - Phoenix', lastUpdated: '1d ago', status: 'Approved' },
  { title: 'Sprint Plan - Week 42', lastUpdated: '2d ago', status: 'Draft' },
  { title: 'API Documentation v1', lastUpdated: '1w ago', status: 'Archived' },
];

const DocumentsPanel = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Documents</Typography>
      <Grid container spacing={3}>
        {demoDocs.map((doc, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}><DocumentCard doc={doc} /></Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DocumentsPanel;