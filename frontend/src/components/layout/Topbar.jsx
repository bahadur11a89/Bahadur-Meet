// src/components/dashboard/Topbar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchBar from './SearchBar';
import ProfileMenu from './ProfileMenu';

function Topbar({ drawerWidth, isSidebarOpen, handleDrawerToggle, handleQuickSettingsToggle }) {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        width: { md: `calc(100% - ${isSidebarOpen ? drawerWidth : 0}px)` },
        ml: { md: `${isSidebarOpen ? drawerWidth : 0}px` },
        transition: (theme) => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Home
        </Typography>
        {/* Breadcrumb placeholder can go here */}
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <SearchBar />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton size="large" color="inherit" onClick={handleQuickSettingsToggle} aria-label="Open quick settings">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;