import React from 'react';
import { Card, CardContent, Typography, Box, Stack, LinearProgress, Divider } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

const categories = [
  { name: 'Documents', size: '1.2 GB', color: 'primary.main' },
  { name: 'Images', size: '3.5 GB', color: 'secondary.main' },
  { name: 'Videos', size: '8.1 GB', color: 'error.main' },
  { name: 'Audio', size: '500 MB', color: 'warning.main' },
  { name: 'Others', size: '250 MB', color: 'info.main' },
];

const StorageOverview = () => {
  const totalUsed = 13.55;
  const totalStorage = 50;
  const usedPercentage = (totalUsed / totalStorage) * 100;

  return (
    <Card variant="outlined" sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <StorageIcon />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Storage</Typography>
        </Stack>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalUsed} GB <Typography component="span" color="text.secondary">/ {totalStorage} GB Used</Typography></Typography>
        <LinearProgress variant="determinate" value={usedPercentage} sx={{ height: 8, borderRadius: 4, my: 2 }} />
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1.5}>
          {categories.map(cat => (
            <Stack key={cat.name} direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: cat.color }} />
                <Typography variant="body2">{cat.name}</Typography>
              </Stack>
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{cat.size}</Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StorageOverview;