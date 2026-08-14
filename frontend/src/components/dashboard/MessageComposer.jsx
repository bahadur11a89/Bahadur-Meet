import React from 'react';
import { Paper, TextField, IconButton, Tooltip, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import styles from './MessageComposer.module.css';

const MessageComposer = () => {
  return (
    <Paper elevation={0} className={styles.composerContainer}>
      <TextField
        fullWidth
        multiline
        maxRows={5}
        placeholder="Type a message..."
        variant="outlined"
        className={styles.textField}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
        <Stack direction="row">
          <Tooltip title="Emoji">
            <IconButton><EmojiEmotionsOutlinedIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Attach file">
            <IconButton><AttachFileOutlinedIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Record voice message">
            <IconButton><MicNoneOutlinedIcon /></IconButton>
          </Tooltip>
        </Stack>
        <Tooltip title="Send Message">
          <span>
            <IconButton color="primary" disabled>
              <SendIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default MessageComposer;