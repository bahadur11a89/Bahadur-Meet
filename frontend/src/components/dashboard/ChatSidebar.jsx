import React from 'react';
import { Box, Typography, TextField, InputAdornment, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConversationList from '../ConversationList/ConversationList';
import styles from './ChatSidebar.module.css';

const ChatSidebar = () => {
  return (
    <Stack className={styles.sidebarContainer}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
          Team Chat
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon /></InputAdornment>
            ),
          }}
        />
      </Box>
      <ConversationList />
    </Stack>
  );
};

export default ChatSidebar;