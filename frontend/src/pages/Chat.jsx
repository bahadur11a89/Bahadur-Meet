import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Stack,
  Badge,
} from '@mui/material';
import { Send, AttachFile, EmojiEmotions, Circle } from '@mui/icons-material';
import io from 'socket.io-client';
import server from '../environment';

export default function ChatPage() {
  const [conversations] = useState([
    { id: 'c1', name: 'Alex Johnson', lastMsg: 'Sounds good! See you in the meeting.', time: '10:45 AM', online: true, unread: 2 },
    { id: 'c2', name: 'Sprint Channel', lastMsg: 'Sarah pushed the latest API updates.', time: 'Yesterday', online: false, unread: 0 },
    { id: 'c3', name: 'David Miller', lastMsg: 'Did you review the PR?', time: 'Aug 5', online: true, unread: 0 },
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([
    { sender: 'Alex Johnson', text: 'Hey there! Are we still on for 2:00 PM?', time: '10:40 AM' },
    { sender: 'You', text: 'Yes! The agenda and slides are ready.', time: '10:42 AM' },
    { sender: 'Alex Johnson', text: 'Sounds good! See you in the meeting.', time: '10:45 AM' },
  ]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    const socket = io(server, { auth: { token } });
    socket.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.disconnect();
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMsg = { sender: 'You', text: inputText.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prev) => [...prev, newMsg]);
      setInputText('');
    }
  };

  return (
    <Box sx={{ p: 4, height: 'calc(100vh - 100px)' }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Team Chat</Typography>
      <Paper variant="outlined" sx={{ height: 'calc(100% - 60px)', borderRadius: 3, display: 'flex', overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          {/* Conversation List */}
          <Grid item xs={12} md={4} sx={{ borderRight: 1, borderColor: 'divider', height: '100%', overflowY: 'auto' }}>
            <Box p={2}>
              <TextField fullWidth size="small" placeholder="Search conversations..." />
            </Box>
            <Divider />
            <List disablePadding>
              {conversations.map((c) => (
                <React.Fragment key={c.id}>
                  <ListItem
                    button
                    selected={activeChat.id === c.id}
                    onClick={() => setActiveChat(c)}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemAvatar>
                      <Badge variant="dot" color="success" invisible={!c.online} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>{c.name.charAt(0)}</Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="subtitle2" fontWeight="bold">{c.name}</Typography>}
                      secondary={<Typography variant="body2" color="text.secondary" noWrap>{c.lastMsg}</Typography>}
                    />
                    <Stack alignItems="flex-end" spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">{c.time}</Typography>
                      {c.unread > 0 && <Badge badgeContent={c.unread} color="primary" />}
                    </Stack>
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Grid>

          {/* Chat Window */}
          <Grid item xs={12} md={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Header */}
            <Box p={2} sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main' }}>{activeChat.name.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">{activeChat.name}</Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Circle sx={{ fontSize: 10, color: activeChat.online ? 'success.main' : 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">{activeChat.online ? 'Online' : 'Offline'}</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>

            {/* Messages Area */}
            <Box p={3} sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: 'grey.50' }}>
              <Stack spacing={2}>
                {messages.map((m, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      alignSelf: m.sender === 'You' ? 'flex-end' : 'flex-start',
                      maxWidth: '70%',
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: m.sender === 'You' ? 'primary.main' : 'white',
                        color: m.sender === 'You' ? 'white' : 'text.primary',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Typography variant="body2">{m.text}</Typography>
                    </Paper>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, textAlign: m.sender === 'You' ? 'right' : 'left' }}>
                      {m.time}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Input Composer */}
            <Box p={2} sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'white' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton color="action"><AttachFile /></IconButton>
                <IconButton color="action"><EmojiEmotions /></IconButton>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <IconButton color="primary" onClick={handleSend} disabled={!inputText.trim()}><Send /></IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
