import React from 'react';
import {
  Dashboard,
  VideoCall,
  CalendarMonth,
  History,
  FolderSpecial,
  Contacts,
  Chat,
  AutoAwesome,
  Settings,
  AdminPanelSettings,
} from '@mui/icons-material';

export const mainNavItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Meetings', icon: <VideoCall />, path: '/meetings' },
  { text: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
  { text: 'History', icon: <History />, path: '/history' },
  { text: 'Recordings', icon: <FolderSpecial />, path: '/recordings' },
  { text: 'Contacts', icon: <Contacts />, path: '/contacts' },
  { text: 'Team Chat', icon: <Chat />, path: '/chat' },
  { text: 'AI Companion', icon: <AutoAwesome />, path: '/ai-assistant' },
];

export const managementNavItems = [
  { text: 'Settings', icon: <Settings />, path: '/settings' },
  { text: 'Admin Panel', icon: <AdminPanelSettings />, path: '/admin' },
];

export const mobileNavItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Meetings', icon: <VideoCall />, path: '/meetings' },
  { text: 'Calendar', icon: <CalendarMonth />, path: '/calendar' },
  { text: 'Chat', icon: <Chat />, path: '/chat' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];