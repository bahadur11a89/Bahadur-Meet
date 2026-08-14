import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import styles from './PageLoader.module.css';

const PageLoader = () => {
    return (
        <Box className={styles.loaderContainer}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading Application...
            </Typography>
        </Box>
    );
};

export default PageLoader;