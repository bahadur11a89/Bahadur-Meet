import React from 'react';
import { Popover, Grid, Typography, Box } from '@mui/material';

const emojis = ['😀', '😂', '😍', '👍', '❤️', '🙏', '🎉', '🔥', '👏', '🤔', '👀', '💯'];

const EmojiPickerPlaceholder = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Popover open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Box sx={{ p: 2, maxWidth: 250 }}>
        <Grid container spacing={1}>
          {emojis.map((emoji, index) => (
            <Grid item key={index} xs={3} sx={{ cursor: 'pointer', textAlign: 'center', fontSize: '1.5rem' }}>{emoji}</Grid>
          ))}
        </Grid>
      </Box>
    </Popover>
  );
};

export default EmojiPickerPlaceholder;