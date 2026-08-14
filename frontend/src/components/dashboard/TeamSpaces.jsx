import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TeamSpaceCard from './TeamSpaceCard';

const demoSpaces = [
  { name: 'Engineering', description: 'Core product development and infrastructure.', members: 25, lastActivity: '2h ago' },
  { name: 'Product', description: 'Roadmap, features, and user stories.', members: 8, lastActivity: '30m ago' },
  { name: 'Design', description: 'UI/UX, branding, and creative assets.', members: 12, lastActivity: '5h ago' },
  { name: 'Marketing', description: 'Campaigns, content, and social media.', members: 15, lastActivity: '1d ago' },
  { name: 'Sales', description: 'Leads, opportunities, and customer relations.', members: 18, lastActivity: '1h ago' },
  { name: 'Support', description: 'Customer help, tickets, and documentation.', members: 22, lastActivity: '5m ago' },
];

const TeamSpaces = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Team Spaces</Typography>
      <Grid container spacing={3}>
        {demoSpaces.map((space, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}><TeamSpaceCard space={space} /></Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamSpaces;