import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Stack, Button, useTheme, useMediaQuery } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import PeopleIcon from '@mui/icons-material/People';
import BackHandIcon from '@mui/icons-material/BackHand';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PollIcon from '@mui/icons-material/Poll';
import GroupsIcon from '@mui/icons-material/Groups';
import styles from './MeetingToolbar.module.css';

const ToolbarButton = ({ title, active, children, ...props }) => (
  <Tooltip title={title}>
    <IconButton
      className={styles.toolbarButton}
      sx={{
        bgcolor: active ? 'primary.main' : 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        '&:hover': {
          bgcolor: active ? 'primary.dark' : 'rgba(255, 255, 255, 0.2)',
        },
      }}
      {...props}
    >
      {children}
    </IconButton>
  </Tooltip>
);

const MeetingToolbar = ({ onToggleParticipants, onToggleChat, onTogglePolls, onToggleBreakoutRooms }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const mainControls = [
    { title: isMuted ? 'Unmute' : 'Mute', onClick: () => setIsMuted(!isMuted), icon: isMuted ? <MicOffIcon /> : <MicIcon /> },
    { title: isCameraOff ? 'Start Video' : 'Stop Video', onClick: () => setIsCameraOff(!isCameraOff), icon: isCameraOff ? <VideocamOffIcon /> : <VideocamIcon /> },
  ];

  const secondaryControls = [
    { title: 'Participants', icon: <PeopleIcon />, onClick: onToggleParticipants },
    { title: 'Chat', icon: <ChatIcon />, onClick: onToggleChat },
    { title: 'Share Screen', icon: <ScreenShareIcon /> },
    { title: 'Record', icon: <RadioButtonCheckedIcon /> },
    { title: 'Polls', icon: <PollIcon />, onClick: onTogglePolls },
    { title: 'Breakout Rooms', icon: <GroupsIcon />, onClick: onToggleBreakoutRooms },
    { title: 'Layout', icon: <ViewCarouselIcon /> },
  ];

  const reactionControls = [
    { title: 'Reactions', icon: <EmojiEmotionsIcon /> },
    { title: 'Raise Hand', icon: <BackHandIcon /> },
  ];

  return (
    <Box component="footer" className={styles.toolbar}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
        {reactionControls.map(ctrl => (
          <ToolbarButton key={ctrl.title} title={ctrl.title}>{ctrl.icon}</ToolbarButton>
        ))}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" spacing={isMobile ? 1 : 2} alignItems="center">
        {mainControls.map(ctrl => (
          <ToolbarButton key={ctrl.title} title={ctrl.title} onClick={ctrl.onClick}>{ctrl.icon}</ToolbarButton>
        ))}
        
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: isMobile ? 1 : 2 }}>
          {secondaryControls.map(ctrl => (
            <ToolbarButton key={ctrl.title} title={ctrl.title} onClick={ctrl.onClick}>{ctrl.icon}</ToolbarButton>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <ToolbarButton title="More"><MoreHorizIcon /></ToolbarButton>
        </Box>
      </Stack>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        variant="contained"
        color="error"
        startIcon={<CallEndIcon />}
        sx={{ borderRadius: '24px', height: '48px', px: 3 }}
      >
        Leave
      </Button>
    </Box>
  );
};

export default MeetingToolbar;