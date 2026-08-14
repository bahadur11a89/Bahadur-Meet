import React, { useState } from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import EmojiPickerPlaceholder from './EmojiPickerPlaceholder';
import FileSharePlaceholder from './FileSharePlaceholder';

const ChatInput = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);

  const handleEmojiClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleFileClick = () => {
    setFileDialogOpen(true);
  };

  return (
    <>
      <Box sx={{ p: 2, backgroundColor: '#252525' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          size="small"
          placeholder="Type a message..."
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#3c3c3c',
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Box>
            <Tooltip title="Emoji">
              <IconButton size="small" onClick={handleEmojiClick}><EmojiEmotionsOutlinedIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Attach File">
              <IconButton size="small" onClick={handleFileClick}><AttachFileOutlinedIcon /></IconButton>
            </Tooltip>
            <Tooltip title="GIF">
              <IconButton size="small"><GifBoxOutlinedIcon /></IconButton>
            </Tooltip>
          </Box>
          <IconButton color="primary" aria-label="send message">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
      <EmojiPickerPlaceholder anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
      <FileSharePlaceholder open={fileDialogOpen} onClose={() => setFileDialogOpen(false)} />
    </>
  );
};

export default ChatInput;