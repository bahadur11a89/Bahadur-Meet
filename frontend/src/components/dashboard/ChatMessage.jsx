import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import styles from './ChatMessage.module.css';

const ChatMessage = ({ message }) => {
  const { sender, text, time, isOwn, avatar } = message;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      className={`${styles.messageContainer} ${isOwn ? styles.ownMessage : ''}`}
    >
      {!isOwn && <Avatar alt={sender} src={avatar} />}
      <Box>
        {!isOwn && (
          <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {sender}
          </Typography>
        )}
        <Box className={styles.messageBubble}>
          <Typography variant="body1">{text}</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" className={styles.timestamp}>
          {time}
        </Typography>
      </Box>
    </Stack>
  );
};

export default ChatMessage;