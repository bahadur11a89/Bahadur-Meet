import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VideocamIcon from '@mui/icons-material/Videocam';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArticleIcon from '@mui/icons-material/Article';
import HubIcon from '@mui/icons-material/Hub';
import BrushIcon from '@mui/icons-material/Brush';
import NoteIcon from '@mui/icons-material/Note';
import MovieIcon from '@mui/icons-material/Movie';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TaskIcon from '@mui/icons-material/Task';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DevicesIcon from '@mui/icons-material/Devices';
import ContactsIcon from '@mui/icons-material/Contacts';
import SecurityIcon from '@mui/icons-material/Security';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TuneIcon from '@mui/icons-material/Tune';
import SchoolIcon from '@mui/icons-material/School';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HelpIcon from '@mui/icons-material/Help';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';

const SIDEBAR_WIDTH = 250;

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Accordion Expand States for Sidebar
  const [openProducts, setOpenProducts] = useState(true);
  const [openAccount, setOpenAccount] = useState(true);
  const [openAdmin, setOpenAdmin] = useState(true);
  const [openSupport, setOpenSupport] = useState(true);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/login');
  };

  const myProductsList = [
    { text: 'AI', path: '/ai-assistant', icon: <AutoAwesomeIcon sx={{ color: '#0E72ED', fontSize: 18 }} />, isNew: true },
    { text: 'Meetings', path: '/meetings', icon: <VideocamIcon sx={{ fontSize: 18 }} /> },
    { text: 'Recordings', path: '/recordings', icon: <FiberManualRecordIcon sx={{ color: '#e11d48', fontSize: 18 }} /> },
    { text: 'Summaries', path: '/history', icon: <ArticleIcon sx={{ fontSize: 18 }} /> },
    { text: 'Hub', path: '/dashboard', icon: <HubIcon sx={{ fontSize: 18 }} />, isNew: true },
    { text: 'Whiteboards', path: '/whiteboards', icon: <BrushIcon sx={{ fontSize: 18 }} /> },
    { text: 'Notes', path: '/notes', icon: <NoteIcon sx={{ fontSize: 18 }} /> },
    { text: 'Clips', path: '/clips', icon: <MovieIcon sx={{ fontSize: 18 }} /> },
    { text: 'Canvas', path: '/canvas', icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
    { text: 'Paper', path: '/paper', icon: <DescriptionIcon sx={{ fontSize: 18 }} /> },
    { text: 'Sheets', path: '/sheets', icon: <TableChartIcon sx={{ fontSize: 18 }} /> },
    { text: 'Slides', path: '/slides', icon: <SlideshowIcon sx={{ fontSize: 18 }} /> },
    { text: 'Tasks', path: '/tasks', icon: <TaskIcon sx={{ fontSize: 18 }} /> },
    { text: 'Scheduler', path: '/calendar', icon: <EventIcon sx={{ fontSize: 18 }} /> },
  ];

  const myAccountList = [
    { text: 'Profile', path: '/settings/profile', icon: <PersonIcon sx={{ fontSize: 18 }} /> },
    { text: 'Settings', path: '/settings', icon: <SettingsIcon sx={{ fontSize: 18 }} /> },
    { text: 'Personal Devices', path: '/settings/audio', icon: <DevicesIcon sx={{ fontSize: 18 }} /> },
    { text: 'Personal Contacts', path: '/contacts', icon: <ContactsIcon sx={{ fontSize: 18 }} /> },
    { text: 'Data & Privacy', path: '/settings/security', icon: <SecurityIcon sx={{ fontSize: 18 }} /> },
  ];

  const adminList = [
    { text: 'Plans and Billing', path: '/plans', icon: <CreditCardIcon sx={{ fontSize: 18 }} /> },
    { text: 'User Management', path: '/admin', icon: <PeopleIcon sx={{ fontSize: 18 }} /> },
    { text: 'Account Management', path: '/admin', icon: <AdminPanelSettingsIcon sx={{ fontSize: 18 }} /> },
    { text: 'Advanced', path: '/settings', icon: <TuneIcon sx={{ fontSize: 18 }} /> },
  ];

  const supportList = [
    { text: 'Bahadur Learning Center', path: '/support', icon: <SchoolIcon sx={{ fontSize: 18 }} />, external: true },
    { text: 'Video Tutorials', path: '/support', icon: <PlayCircleIcon sx={{ fontSize: 18 }} />, external: true },
    { text: 'Knowledge Base', path: '/support', icon: <HelpIcon sx={{ fontSize: 18 }} /> },
  ];

  const sidebarContent = (
    <Box sx={{ overflowY: 'auto', height: '100%', py: 2, bgcolor: '#f8fafc' }}>
      <List disablePadding>
        {/* Home */}
        <ListItem disablePadding sx={{ px: 2, mb: 1 }}>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={location.pathname === '/dashboard'}
            sx={{
              borderRadius: 2,
              color: location.pathname === '/dashboard' ? '#0E72ED' : '#334155',
              bgcolor: location.pathname === '/dashboard' ? 'rgba(14, 114, 237, 0.08)' : 'transparent',
              '&:hover': { bgcolor: 'rgba(14, 114, 237, 0.06)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} />
          </ListItemButton>
        </ListItem>

        {/* My Products Group Header */}
        <ListItemButton onClick={() => setOpenProducts(!openProducts)} sx={{ px: 2, py: 1 }}>
          <ListItemText primary="My Products" primaryTypographyProps={{ fontWeight: 700, fontSize: '0.825rem', color: '#64748b' }} />
          {openProducts ? <ExpandLess sx={{ fontSize: 18, color: '#64748b' }} /> : <ExpandMore sx={{ fontSize: 18, color: '#64748b' }} />}
        </ListItemButton>

        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2, pr: 2 }}>
            {myProductsList.map((item, idx) => (
              <ListItemButton
                key={idx}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  py: 0.6,
                  mb: 0.3,
                  color: location.pathname === item.path ? '#0E72ED' : '#334155',
                  '&:hover': { bgcolor: 'rgba(14, 114, 237, 0.06)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                {item.isNew && (
                  <Chip label="New" size="small" sx={{ height: 16, fontSize: '0.65rem', bgcolor: 'rgba(14, 114, 237, 0.1)', color: '#0E72ED', fontWeight: 700, mr: 0.5 }} />
                )}
                <OpenInNewIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <Divider sx={{ my: 1.5 }} />

        {/* My Account Group Header */}
        <ListItemButton onClick={() => setOpenAccount(!openAccount)} sx={{ px: 2, py: 1 }}>
          <ListItemText primary="My Account" primaryTypographyProps={{ fontWeight: 700, fontSize: '0.825rem', color: '#64748b' }} />
          {openAccount ? <ExpandLess sx={{ fontSize: 18, color: '#64748b' }} /> : <ExpandMore sx={{ fontSize: 18, color: '#64748b' }} />}
        </ListItemButton>

        <Collapse in={openAccount} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2, pr: 2 }}>
            {myAccountList.map((item, idx) => (
              <ListItemButton
                key={idx}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  py: 0.6,
                  mb: 0.3,
                  color: location.pathname === item.path ? '#0E72ED' : '#334155',
                  '&:hover': { bgcolor: 'rgba(14, 114, 237, 0.06)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <Divider sx={{ my: 1.5 }} />

        {/* Admin Group Header */}
        <ListItemButton onClick={() => setOpenAdmin(!openAdmin)} sx={{ px: 2, py: 1 }}>
          <ListItemText primary="Admin" primaryTypographyProps={{ fontWeight: 700, fontSize: '0.825rem', color: '#64748b' }} />
          {openAdmin ? <ExpandLess sx={{ fontSize: 18, color: '#64748b' }} /> : <ExpandMore sx={{ fontSize: 18, color: '#64748b' }} />}
        </ListItemButton>

        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2, pr: 2 }}>
            {adminList.map((item, idx) => (
              <ListItemButton
                key={idx}
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  py: 0.6,
                  mb: 0.3,
                  color: '#334155',
                  '&:hover': { bgcolor: 'rgba(14, 114, 237, 0.06)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <Divider sx={{ my: 1.5 }} />

        {/* Support Group Header */}
        <ListItemButton onClick={() => setOpenSupport(!openSupport)} sx={{ px: 2, py: 1 }}>
          <ListItemText primary="Support" primaryTypographyProps={{ fontWeight: 700, fontSize: '0.825rem', color: '#64748b' }} />
          {openSupport ? <ExpandLess sx={{ fontSize: 18, color: '#64748b' }} /> : <ExpandMore sx={{ fontSize: 18, color: '#64748b' }} />}
        </ListItemButton>

        <Collapse in={openSupport} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2, pr: 2 }}>
            {supportList.map((item, idx) => (
              <ListItemButton
                key={idx}
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  py: 0.6,
                  mb: 0.3,
                  color: '#334155',
                  '&:hover': { bgcolor: 'rgba(14, 114, 237, 0.06)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                {item.external && <OpenInNewIcon sx={{ fontSize: 12, color: '#94a3b8' }} />}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', bgcolor: '#f4f5f7' }}>
      {/* Dark Top Utilities Header Bar */}
      <Box sx={{ bgcolor: '#0b1329', color: '#ffffff', py: 0.6, px: { xs: 2, md: 3 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* Left Utility: Search button */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
            <SearchIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
            <Typography variant="caption" sx={{ color: '#cbd5e1', fontWeight: 600 }}>
              Search
            </Typography>
          </Stack>

          {/* Right Utilities: Support | Phone | Contact Sales | Request Demo */}
          <Stack direction="row" spacing={{ xs: 1, sm: 2.5 }} alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <Typography variant="caption" component={Link} to="/support" sx={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, '&:hover': { color: '#ffffff' } }}>
              Support
            </Typography>
            <Typography variant="caption" component="a" href="tel:+919648387996" sx={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 600 }}>
              +91 9648387996
            </Typography>
            <Typography variant="caption" component={Link} to="/support" sx={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, '&:hover': { color: '#ffffff' } }}>
              Contact Sales
            </Typography>
            <Typography variant="caption" component={Link} to="/plans" sx={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, '&:hover': { color: '#ffffff' } }}>
              Request a Demo
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Main Light Navigation App Bar */}
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 3 }, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <Stack direction="row" spacing={{ xs: 1, sm: 3 }} alignItems="center">
            {isMobile && (
              <IconButton onClick={handleDrawerToggle} edge="start" sx={{ color: '#334155' }}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Brand Logo */}
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.2, textDecoration: 'none' }}>
              <img src="/logo_b.png" alt="Bahadur Meet Logo" style={{ height: 34, width: 34, borderRadius: 8 }} />
              <Typography variant="h6" sx={{ color: '#0E72ED', fontWeight: 800, letterSpacing: '-0.5px' }}>
                Bahadur Meet
              </Typography>
            </Box>

            {!isMobile && (
              <Stack direction="row" spacing={1}>
                <Button component={Link} to="/products" sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Products</Button>
                <Button component={Link} to="/solutions" sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Solutions</Button>
                <Button component={Link} to="/resources" sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Resources</Button>
                <Button component={Link} to="/plans" sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Plans & Pricing</Button>
              </Stack>
            )}
          </Stack>

          {/* Right Action Items */}
          <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }} alignItems="center">
            {!isMobile && (
              <>
                <Button component={Link} to="/calendar" sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Schedule</Button>
                <Button component={Link} to="/dashboard" sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Join</Button>
                <Button endIcon={<KeyboardArrowDownIcon />} onClick={() => navigate('/meeting/instant-' + Math.floor(1000 + Math.random() * 9000))} sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Host</Button>
                <Button endIcon={<KeyboardArrowDownIcon />} sx={{ color: '#334155', fontWeight: 600, textTransform: 'none' }}>Web App</Button>
              </>
            )}

            {/* User Profile Avatar Dropdown */}
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, ml: 1 }}>
              <Avatar
                src="/logo_b.png"
                alt={user?.name || 'Bahadur Raj'}
                sx={{ width: 36, height: 36, bgcolor: '#0E72ED', fontWeight: 'bold' }}
              >
                {(user?.name || user?.username || 'B').charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              PaperProps={{ sx: { minWidth: 200, mt: 1, borderRadius: 2 } }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">{user?.name || user?.username || 'Bahadur Raj'}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.email || 'bahadur@example.com'}</Typography>
                <Typography variant="caption" display="block" color="primary" fontWeight="bold" sx={{ mt: 0.5 }}>
                  Plan: Workplace Basic
                </Typography>
              </Box>
              <Divider />
              <MenuItem component={Link} to="/settings/profile" onClick={handleCloseUserMenu}>Profile Settings</MenuItem>
              <MenuItem component={Link} to="/plans" onClick={handleCloseUserMenu}>Billing & Plans</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogoutIcon sx={{ fontSize: 18, mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Workspace Area: Left Sidebar + Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Left Permanent / Drawer Sidebar */}
        <Box component="nav" sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{ '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH, boxSizing: 'border-box' } }}
            >
              {sidebarContent}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                '& .MuiDrawer-paper': {
                  width: SIDEBAR_WIDTH,
                  boxSizing: 'border-box',
                  position: 'relative',
                  height: 'calc(100dvh - 100px)',
                  borderRight: '1px solid #e2e8f0',
                },
              }}
              open
            >
              {sidebarContent}
            </Drawer>
          )}
        </Box>

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, minHeight: 'calc(100dvh - 100px)', p: { xs: 2, md: 3 }, width: { xs: '100%', md: `calc(100% - ${SIDEBAR_WIDTH}px)` } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;