import React from 'react';
import { Box, Typography, Stack, AppBar, Toolbar, Avatar, IconButton, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChatMessage from './ChatMessage';
import MessageComposer from '../MessageComposer/MessageComposer';
import styles from './MessageArea.module.css';

const demoMessages = [
  { sender: 'Alice Johnson', avatar: '/static/images/avatar/1.jpg', text: 'Hey everyone, let\'s get started.', time: '10:01 AM', isOwn: false },
  { sender: 'You', text: 'Sounds good, I\'m ready.', time: '10:01 AM', isOwn: true },
  { sender: 'Alice Johnson', avatar: '/static/images/avatar/1.jpg', text: 'Great! I just pushed the latest designs. Can you take a look?', time: '10:02 AM', isOwn: false },
];

const MessageArea = ({ onMenuClick }) => {
  return (
    <Stack className={styles.messageAreaContainer}>
      <AppBar position="static" color="inherit" elevation={0} className={styles.header}>
        <Toolbar>
          <IconButton edge="start" sx={{ mr: 2, display: { md: 'none' } }} onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <Avatar alt="Alice Johnson" src="/static/images/avatar/1.jpg" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Alice Johnson</Typography>
            <Typography variant="caption" color="text.secondary">Online</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton><PhoneIcon /></IconButton>
          <IconButton><VideocamIcon /></IconButton>
          <IconButton><InfoOutlinedIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Stack className={styles.messageList}>
        <Divider>Today</Divider>
        {demoMessages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Alice is typing...
          </Typography>
        </Box>
      </Stack>

      <MessageComposer />
    </Stack>
  );
};

export default MessageArea;