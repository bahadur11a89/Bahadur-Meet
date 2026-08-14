import React from 'react';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import styles from './LiveCaptions.module.css';

const LiveCaptions = () => {
  return (
    <Box className={styles.captionsBar}>
      <Typography variant="body2" className={styles.captionText}>
        <strong>Alice:</strong> Okay, so let's move on to the next agenda item.
      </Typography>
      <Select size="small" defaultValue="en" variant="standard" disableUnderline>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
      </Select>
    </Box>
  );
};

export default LiveCaptions;