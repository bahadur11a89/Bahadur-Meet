import React from 'react';
import { Popover, Grid, IconButton, Box } from '@mui/material';

const allReactions = ['👍', '👏', '❤️', '🎉', '😂', '😮', '🤔', '😢', '🤯', '🙏', '💯', '👋'];

const ReactionPicker = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      PaperProps={{ sx: { borderRadius: 4, mt: -1 } }}
    >
      <Box sx={{ p: 2, maxWidth: 300 }}>
        <Grid container spacing={1}>
          {allReactions.map((emoji, index) => (
            <Grid item key={index} xs={3}>
              <IconButton sx={{ fontSize: '1.5rem', width: '100%', height: '100%' }}>
                {emoji}
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Popover>
  );
};

export default ReactionPicker;