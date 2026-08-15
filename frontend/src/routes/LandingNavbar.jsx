import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { InputBase, Paper } from '@mui/material';

const navLinks = [
  { text: 'Products', path: '/products', targetId: 'products' },
  { text: 'AI', path: '/ai', targetId: 'ai-assistant' },
  { text: 'Solutions', path: '/solutions', targetId: 'solutions' },
  { text: 'Pricing', path: '/plans', targetId: 'pricing' },
  { text: 'Resources', path: '/resources', targetId: 'features' },
];

const LandingNavbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main, display: 'flex', alignItems: 'center', gap: 1 }}>
        <img src="/logo_b.png" alt="Bahadur Meet Logo" style={{ height: 32, borderRadius: 6 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: theme.palette.primary.contrastText, fontWeight: 700 }}
        >
          Bahadur Meet
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItemButton key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton component={Link} to="/meet">
          <ListItemText primary="Meet" />
        </ListItemButton>
        <ListItemButton component={Link} to="/support">
          <ListItemText primary="Support" />
        </ListItemButton>
        <ListItemButton component={Link} to="/login">
          <ListItemText primary="Sign In" />
        </ListItemButton>
        <ListItemButton component={Link} to="/register">
          <ListItemText primary="Sign Up Free" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.background.paper, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 0.5, px: { xs: 2, md: 3 } }}>
        {/* Left: Brand Logo + Primary Nav Links */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.2, textDecoration: 'none' }}>
            <img src="/logo_b.png" alt="Bahadur Meet Logo" style={{ height: 36, width: 36, borderRadius: 8 }} />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 800,
                letterSpacing: '-0.5px',
                fontSize: '1.25rem',
              }}
            >
              Bahadur Meet
            </Typography>
          </Box>

          {!isMobile && (
            <Stack direction="row" spacing={0.5}>
              {navLinks.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '0.9rem', textTransform: 'none', px: 1.5 }}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Right Section: Searchbar + Global Icon + Meet + Support + Contact Sales + Sign In + Sign Up Free */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {!isMobile && (
            <>
              {/* Search Bar */}
              <Paper
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  }
                }}
                sx={{ p: '2px 8px', display: 'flex', alignItems: 'center', width: 200, borderRadius: 5, border: '1px solid #e0e0e0', boxShadow: 'none' }}
              >
                <IconButton type="submit" size="small" sx={{ p: 0.5, color: 'text.secondary' }}>
                  <SearchIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <InputBase
                  sx={{ ml: 0.5, flex: 1, fontSize: '0.825rem' }}
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Paper>

              {/* Global Icon */}
              <IconButton color="inherit" size="small" title="Language Select" sx={{ color: 'text.secondary' }}>
                <LanguageIcon />
              </IconButton>

              {/* Meet */}
              <Button component={Link} to="/meet" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '0.875rem', textTransform: 'none' }}>
                Meet
              </Button>

              {/* Support */}
              <Button component={Link} to="/support" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '0.875rem', textTransform: 'none' }}>
                Support
              </Button>

              {/* Contact Sales */}
              <Button href="tel:+18887999666" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '0.875rem', textTransform: 'none' }}>
                Contact Sales
              </Button>

              {/* Sign In */}
              <Button component={Link} to="/login" sx={{ color: theme.palette.primary.main, fontWeight: 700, fontSize: '0.875rem', textTransform: 'none' }}>
                Sign In
              </Button>

              {/* Sign Up Free */}
              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{ borderRadius: 20, px: 2.5, py: 0.8, fontWeight: 700, fontSize: '0.875rem', textTransform: 'none' }}
              >
                Sign Up Free
              </Button>
            </>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>

      {/* Mobile Drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </AppBar>
  );
};

export default LandingNavbar;