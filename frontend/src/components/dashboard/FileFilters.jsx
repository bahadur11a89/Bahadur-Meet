import React from 'react';
import { Toolbar, TextField, InputAdornment, Button, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

const FileFilters = ({ view, onViewChange }) => {
  return (
    <Toolbar sx={{ bgcolor: 'background.paper', borderRadius: 2, mb: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" width="100%">
        <TextField
          size="small"
          placeholder="Search files"
          variant="outlined"
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
          sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}
        />
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<FilterListIcon />}>Filter</Button>
          <Button variant="outlined" startIcon={<SortIcon />}>Sort</Button>
        </Stack>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={onViewChange}
          aria-label="view toggle"
        >
          <ToggleButton value="grid" aria-label="grid view"><ViewModuleIcon /></ToggleButton>
          <ToggleButton value="list" aria-label="list view"><ViewListIcon /></ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Toolbar>
  );
};

export default FileFilters;