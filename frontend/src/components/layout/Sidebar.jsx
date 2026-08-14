import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Tooltip,
    IconButton,
    Badge,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainNavItems, managementNavItems } from '../dashboard/NavigationConfig';
import styles from './Sidebar.module.css';

const NavList = ({ items, isSidebarOpen }) => (
    <List sx={{ p: 1 }}>
        {items.map((item) => (
            <Tooltip title={isSidebarOpen ? '' : item.text} placement="right" key={item.path}>
                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to={item.path}
                        className={styles.navItem}
                        aria-label={item.text}
                        sx={{
                            '&.active': {
                                backgroundColor: 'action.selected',
                                color: 'primary.main',
                                '& .MuiListItemIcon-root': {
                                    color: 'primary.main',
                                },
                            },
                        }}
                    >
                        <ListItemIcon className={styles.navIcon}>
                            {item.badge ? (
                                <Badge badgeContent={item.badge} color="primary">
                                    {item.icon}
                                </Badge>
                            ) : (
                                item.icon
                            )}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            sx={{ opacity: isSidebarOpen ? 1 : 0, '& .MuiTypography-root': { fontWeight: 'inherit' } }}
                        />
                    </ListItemButton>
                </ListItem>
            </Tooltip>
        ))}
    </List>
);

const Sidebar = ({
    drawerWidth,
    collapsedWidth,
    isSidebarOpen,
    onToggle,
    isMobile,
}) => {
    const currentWidth = isSidebarOpen ? drawerWidth : collapsedWidth;

    const drawerContent = (
        <Box className={styles.drawerContent}>
            <Box className={styles.drawerHeader}>
                {isSidebarOpen && (
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                        Zoom Enterprise
                    </Typography>
                )}
                <IconButton onClick={onToggle} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                    {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
                <NavList items={mainNavItems} isSidebarOpen={isSidebarOpen} />
                <Divider sx={{ my: 1 }} />
                <NavList items={managementNavItems} isSidebarOpen={isSidebarOpen} />
            </Box>
        </Box>
    );

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            open={isSidebarOpen}
            onClose={isMobile ? onToggle : undefined}
            ModalProps={{ keepMounted: true }} // Better open performance on mobile.
            sx={{
                width: isMobile ? drawerWidth : currentWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isMobile ? drawerWidth : currentWidth,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    overflowX: 'hidden',
                    transition: (theme) =>
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};

export default Sidebar;