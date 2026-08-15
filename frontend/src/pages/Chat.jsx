import React, { useState, useEffect, useRef } from 'react';
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
  Chip,
} from '@mui/material';
import { Send, AttachFile, EmojiEmotions, Circle } from '@mui/icons-material';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { emit, subscribe, socket } = useSocket();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const [conversations] = useState([
    { id: '650000000000000000000001', name: 'General Team Channel', lastMsg: 'No messages yet', time: 'Now', online: true, unread: 0 },
    { id: '650000000000000000000002', name: 'Architecture & Design', lastMsg: 'No messages yet', time: 'Now', online: true, unread: 0 },
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(socket ? socket.connected : false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Monitor Socket connection status
  useEffect(() => {
    if (!socket) return;
    setIsConnected(socket.connected);

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  // Join Room & Load History when Active Chat Changes
  useEffect(() => {
    if (!activeChat?.id) return;
    setMessages([]);

    // Join channel room
    emit('join-call', activeChat.id);

    // Request chat history if backend supports ack/event
    emit('chat:get-history', { meetingId: activeChat.id }, (response) => {
      if (response && Array.isArray(response.data)) {
        const historyMsgs = response.data.map((msg) => ({
          id: msg._id || msg.id || `${msg.createdAt}-${Math.random()}`,
          sender: (msg.senderId === (user?.id || user?._id)) ? 'You' : (msg.senderName || 'Participant'),
          text: msg.content || msg.text || '',
          time: msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        }));
        setMessages(historyMsgs);
      }
    });

  }, [activeChat, user, emit]);

  // Listen for real-time messages with deduplication
  useEffect(() => {
    const unsubscribe = subscribe('chat:new-message', (data) => {
      if (data && data.content) {
        const currentUserId = user?.id || user?._id;
        const isMe = data.senderId === currentUserId;
        const msgId = data._id || data.id || data.messageId || `${Date.now()}-${Math.random()}`;

        const newMsg = {
          id: msgId,
          sender: isMe ? 'You' : (data.senderName || 'Participant'),
          text: data.content,
          time: data.createdAt ? new Date(data.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => {
          if (prev.some((m) => m.id === msgId)) {
            return prev;
          }
          return [...prev, newMsg];
        });
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [subscribe, user]);

  const handleSend = () => {
    if (inputText.trim() && activeChat?.id) {
      const text = inputText.trim();
      setInputText('');
      emit('chat:send-message', {
        meetingId: activeChat.id,
        content: text,
      });
    }
  };

  return (
    <Box sx={{ p: 4, height: 'calc(100vh - 100px)' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Team Chat</Typography>
        <Chip
          label={isConnected ? 'Socket Connected' : 'Socket Disconnected'}
          color={isConnected ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      </Stack>

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
                    <Circle sx={{ fontSize: 10, color: isConnected ? 'success.main' : 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">{isConnected ? 'Online' : 'Offline'}</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>

            {/* Messages Area */}
            <Box p={3} sx={{ flexGrow: 1, overflowY: 'auto', bgcolor: 'grey.50' }}>
              {messages.length === 0 ? (
                <Box textAlign="center" py={8}>
                  <Typography variant="body2" color="text.secondary">
                    No messages yet in {activeChat.name}. Send a message to start the conversation.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {messages.map((m, idx) => (
                    <Box
                      key={m.id || idx}
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
                        <Typography variant="caption" display="block" color={m.sender === 'You' ? 'rgba(255,255,255,0.8)' : 'text.secondary'} mb={0.5}>
                          {m.sender}
                        </Typography>
                        <Typography variant="body2">{m.text}</Typography>
                      </Paper>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, textAlign: m.sender === 'You' ? 'right' : 'left' }}>
                        {m.time}
                      </Typography>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Stack>
              )}
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
                  disabled={!isConnected}
                />
                <IconButton color="primary" onClick={handleSend} disabled={!inputText.trim() || !isConnected}>
                  <Send />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
