import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    Avatar,
    Menu,
    MenuItem,
    Box,
    Tooltip,
    ListItemIcon,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    HelpOutline as HelpIcon,
    AccountCircle,
    Settings,
    Business,
    Logout,
} from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../dashboard/ThemeToggle';
import styles from './TopNavbar.module.css';
import CreateMeetingDialog from '../meeting/CreateMeetingDialog';

const TopNavbar = ({ onDrawerToggle, sidebarWidth, isSidebarOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [createMeetingDialogOpen, setCreateMeetingDialogOpen] = useState(false);
    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleMenuClose();
        logout();
        navigate('/login');
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}><ListItemIcon><Settings fontSize="small" /></ListItemIcon>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}><ListItemIcon><Business fontSize="small" /></ListItemIcon>Organization</MenuItem>
            <MenuItem onClick={handleLogout}><ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout</MenuItem>
        </Menu>
    );

    return (
        <AppBar
            position="fixed"
            className={styles.appBar}
            sx={{
                width: { md: `calc(100% - ${sidebarWidth}px)` },
                ml: { md: `${sidebarWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {AppConfig.appName}
                </Typography>

                <Box className={styles.search}>
                    <Box className={styles.searchIconWrapper}>
                        <SearchIcon />
                    </Box>
                    <InputBase
                        placeholder="Searchâ€¦"
                        classes={{ root: styles.inputRoot, input: styles.inputInput }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title="Schedule New Meeting">
                        <IconButton color="inherit" onClick={() => setCreateMeetingDialogOpen(true)}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <ThemeToggle />
                    <Tooltip title="Notifications">
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Help">
                        <IconButton color="inherit">
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Account settings">
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar sx={{ width: 32, height: 32 }} src={user?.avatarUrl}>
                                {/* Fallback to first initial if no avatar */}
                                {user?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
            {renderMenu}
            <CreateMeetingDialog open={createMeetingDialogOpen} onClose={() => setCreateMeetingDialogOpen(false)} />
        </AppBar>
    );
};

export default TopNavbar;