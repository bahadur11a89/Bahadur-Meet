import React, { useState } from 'react';
import { List, ListSubheader } from '@mui/material';
import ConversationItem from '../ConversationItem/ConversationItem';

const pinnedConversations = [
  { name: 'Project Phoenix', avatar: '/static/images/avatar/group1.jpg', lastMessage: 'Alice: Let\'s sync tomorrow.', time: '1h ago', unread: 2, online: false },
];

const recentConversations = [
  { name: 'Alice Johnson', avatar: '/static/images/avatar/1.jpg', lastMessage: 'Sounds good, I\'m ready.', time: '5m ago', unread: 0, online: true },
  { name: 'Marketing Team', avatar: '/static/images/avatar/group2.jpg', lastMessage: 'Bob: New campaign mockups are in.', time: '2h ago', unread: 5, online: false },
  { name: 'David Chen', avatar: '/static/images/avatar/4.jpg', lastMessage: 'Can you review this PR?', time: 'Yesterday', unread: 0, online: false },
];

const ConversationList = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
      <ListSubheader>Pinned</ListSubheader>
      {pinnedConversations.map((convo, index) => (
        <ConversationItem key={index} conversation={convo} selected={selectedIndex === index} onClick={() => setSelectedIndex(index)} />
      ))}

      <ListSubheader>Recent</ListSubheader>
      {recentConversations.map((convo, index) => (
        <ConversationItem key={index} conversation={convo} selected={selectedIndex === index + pinnedConversations.length} onClick={() => setSelectedIndex(index + pinnedConversations.length)} />
      ))}
    </List>
  );
};

export default ConversationList;