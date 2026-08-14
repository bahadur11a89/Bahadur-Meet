import React, { useState } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import ChatSidebar from '../ChatSidebar/ChatSidebar';
import MessageArea from '../MessageArea/MessageArea';
import styles from './ChatWorkspace.module.css';

const sidebarWidth = 320;

const ChatWorkspace = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box className={styles.workspaceContainer}>
      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: sidebarWidth, boxSizing: 'border-box', position: 'relative' },
          }}
        >
          <ChatSidebar />
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: { width: sidebarWidth, boxSizing: 'border-box' },
          }}
        >
          <ChatSidebar />
        </Drawer>
      )}
      <Box component="main" className={styles.mainContent}>
        <MessageArea onMenuClick={handleDrawerToggle} />
      </Box>
    </Box>
  );
};

export default ChatWorkspace;