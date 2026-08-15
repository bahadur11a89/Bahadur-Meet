import React, { useState } from 'react';
import { Box, Stack, Drawer, Tabs, Tab, useTheme, useMediaQuery, IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import styles from './MeetingLayout.module.css';

const MeetingHeader = () => <Box sx={{p: 2, borderBottom: 1, borderColor: 'divider'}}>Meeting Header</Box>;
const VideoGrid = () => <Box sx={{flexGrow: 1, p: 2, display: 'grid', placeContent: 'center'}}>Video Grid</Box>;
const MeetingToolbar = ({ onToggleParticipants, onToggleChat }) => (
  <Box sx={{p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', gap: 1}}>
    <IconButton onClick={onToggleParticipants} aria-label="Toggle Participants">
      <PeopleIcon />
    </IconButton>
    <IconButton onClick={onToggleChat} aria-label="Toggle Chat">
      <ChatIcon />
    </IconButton>
  </Box>
);
const ParticipantsPanel = () => <Box sx={{p: 2}}>Participants Panel</Box>;
const MeetingChat = () => <Box sx={{p: 2}}>Meeting Chat</Box>;

const panelWidth = 340;

const MeetingLayout = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPanelOpen(true);
  };

  const handlePanelToggle = (tabIndex) => {
    if (panelOpen && activeTab === tabIndex) {
      setPanelOpen(false);
    } else {
      setActiveTab(tabIndex);
      setPanelOpen(true);
    }
  };

  const TABS = [
    { label: 'Participants', icon: <PeopleIcon />, component: <ParticipantsPanel /> },
    { label: 'Chat', icon: <ChatIcon />, component: <MeetingChat /> },
  ];

  const panelContent = (
    <Stack sx={{ height: '100%' }}>
      <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
        {TABS.map((tab, index) => (
          <Tab key={index} icon={tab.icon} aria-label={tab.label} />
        ))}
      </Tabs>
      {TABS[activeTab] && TABS[activeTab].component}
    </Stack>
  );

  return (
    <Stack className={styles.meetingLayout}>
      <MeetingHeader />
      <Box className={styles.mainContainer}>
        <Box
          component="main"
          className={styles.mainContent}
          sx={{ ...(!isMobile && panelOpen && { marginRight: `${panelWidth}px` }) }}
        >
          <VideoGrid />
        </Box>
        <Drawer
          anchor="right"
          open={panelOpen}
          variant={isMobile ? 'temporary' : 'persistent'}
          onClose={() => setPanelOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: panelWidth, position: isMobile ? 'fixed' : 'relative' } }}
        >
          {panelContent}
        </Drawer>
      </Box>
      <MeetingToolbar onToggleParticipants={() => handlePanelToggle(0)} onToggleChat={() => handlePanelToggle(1)} />
    </Stack>
  );
};

export default MeetingLayout;