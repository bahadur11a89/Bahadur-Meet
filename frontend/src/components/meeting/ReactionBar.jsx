import React from 'react';
import { Box, IconButton, Typography, Badge } from '@mui/material';
import styles from './ReactionBar.module.css';

const reactions = ['👍', '👏', '❤️', '🎉', '😂', '😮'];

const ReactionBar = () => {
  return (
    <Box className={styles.reactionBar}>
      {reactions.map((emoji, index) => (
        <Badge key={index} badgeContent={index + 1} color="primary">
          <IconButton className={styles.reactionButton}>
            <Typography variant="h6">{emoji}</Typography>
          </IconButton>
        </Badge>
      ))}
    </Box>
  );
};

export default ReactionBar;