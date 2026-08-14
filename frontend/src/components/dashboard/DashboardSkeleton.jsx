import React from 'react';
import { Grid, Skeleton, Box, Paper } from '@mui/material';

const DashboardSkeleton = () => {
    return (
        <Box>
            <Skeleton variant="rectangular" width="100%" height={130} sx={{ mb: 4, borderRadius: 4 }} />
            <Grid container spacing={3}>
                {[...Array(4)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 4 }} />
                    </Grid>
                ))}
                {[...Array(2)].map((_, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 4 }} />
                    </Grid>
                ))}
                <Grid item xs={12}>
                     <Skeleton variant="text" width={200} height={56} sx={{ mt: 4, mb: 1 }} />
                </Grid>
                 {[...Array(3)].map((_, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: 4 }} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DashboardSkeleton;