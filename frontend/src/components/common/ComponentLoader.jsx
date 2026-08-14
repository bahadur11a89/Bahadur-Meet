import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import styles from './ComponentLoader.module.css';

const ComponentLoader = ({ size = 40 }) => {
    return (
        <Box className={styles.loaderContainer}>
            <CircularProgress size={size} />
        </Box>
    );
};

export default ComponentLoader;