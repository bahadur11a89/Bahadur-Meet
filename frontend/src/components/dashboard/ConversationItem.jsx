import React from 'react';
import { ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Badge, Box } from '@mui/material';
import styles from './ConversationItem.module.css';

const ConversationItem = ({ conversation, selected }) => {
  const { name, avatar, lastMessage, time, unread } = conversation;

  return (
    <ListItemButton
      selected={selected}
      className={styles.conversationItem}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'action.selected',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        },
      }}
    >
      <ListItemAvatar>
        <Badge color="success" variant="dot" overlap="circular" invisible={!conversation.online}>
          <Avatar alt={name} src={avatar} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={lastMessage}
        primaryTypographyProps={{ fontWeight: 'medium', noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <Box sx={{ textAlign: 'right', ml: 1 }}>
        <Typography variant="caption" color="text.secondary">{time}</Typography>
        {unread > 0 && <Badge badgeContent={unread} color="primary" sx={{ mt: 0.5 }} />}
      </Box>
    </ListItemButton>
  );
};

export default ConversationItem;