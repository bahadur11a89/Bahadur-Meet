import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import styles from './MeetingChat.module.css';

const demoMessages = [
  { sender: 'Alice Johnson', text: 'Hey everyone, let\'s get started.', time: '10:01 AM', isOwn: false },
  { sender: 'You', text: 'Sounds good, I\'m ready.', time: '10:01 AM', isOwn: true },
  { sender: 'Bob Williams', text: 'Just joined. What did I miss?', time: '10:02 AM', isOwn: false },
  { sender: 'Alice Johnson', text: 'Not much, Bob. We are just kicking off.', time: '10:02 AM', isOwn: false },
];

const MeetingChat = () => {
  return (
    <Stack className={styles.panelContainer}>
      <Box className={styles.panelHeader}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Meeting Chat
        </Typography>
      </Box>
      <Stack className={styles.messageList}>
        {demoMessages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Charlie is typing...
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <ChatInput />
    </Stack>
  );
};

export default MeetingChat;