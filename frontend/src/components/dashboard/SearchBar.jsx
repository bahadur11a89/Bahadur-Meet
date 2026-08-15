import React, { useState } from 'react';
import {
  InputBase,
  Box,
  Dialog,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        onClick={handleOpen}
        className={styles.search}
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box sx={{ pl: 2, pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
          <SearchIcon color="action" />
        </Box>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          readOnly
          sx={{ pl: 1, pr: 2, width: '100%', cursor: 'pointer' }}
        />
        <Box className={styles.kbd}>
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ sx: { mt: -40 } }}>
        <Box sx={{ p: 2 }}>
          <InputBase
            startAdornment={<SearchIcon sx={{ mr: 1 }} color="action" />}
            placeholder="Search for meetings, contacts, or files..."
            autoFocus
            fullWidth
          />
        </Box>
        <Divider />
        <List>
          <ListItem>
            <ListItemIcon><HistoryIcon /></ListItemIcon>
            <ListItemText primary="[Placeholder] Recent Search 1" />
          </ListItem>
          <Typography variant="caption" sx={{ p: 2, display: 'block' }}>Search suggestions will appear here.</Typography>
        </List>
      </Dialog>
    </>
  );
};

export default SearchBar;