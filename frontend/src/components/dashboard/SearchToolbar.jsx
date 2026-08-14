import React from 'react';
import { Toolbar, TextField, InputAdornment, Stack, Chip, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const quickFilters = ['Today', 'This Week', 'This Month', 'Favorites'];

const SearchToolbar = () => {
  return (
    <Toolbar sx={{ bgcolor: 'background.paper', borderRadius: 2, mb: 2, p: { xs: 2, sm: '0 16px' }, flexWrap: 'wrap', gap: 2 }}>
      <TextField
        size="small"
        placeholder="Search meetings by name, ID, or participant..."
        variant="outlined"
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: '300px' } }}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
          Quick Filters:
        </Typography>
        {quickFilters.map(filter => (
          <Chip key={filter} label={filter} variant="outlined" clickable />
        ))}
      </Stack>
    </Toolbar>
  );
};

export default SearchToolbar;