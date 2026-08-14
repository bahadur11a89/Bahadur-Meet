import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const SkeletonCard = React.memo(() => {
  return (
    <Card variant="outlined" sx={{ borderRadius: '16px' }}>
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="40%" />
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
        <Skeleton variant="rectangular" height={60} sx={{ mt: 2, borderRadius: 1 }} />
      </CardContent>
    </Card>
  );
});

export default SkeletonCard;