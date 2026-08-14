import React from 'react';
import { Toolbar, Typography, IconButton, Button, ToggleButtonGroup, ToggleButton, Stack, TextField, InputAdornment } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';

const CalendarHeader = ({ view, onViewChange }) => {
  return (
    <Toolbar sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', minWidth: '180px' }}>
          October 2023
        </Typography>
        <IconButton aria-label="previous month"><ChevronLeftIcon /></IconButton>
        <IconButton aria-label="next month"><ChevronRightIcon /></IconButton>
        <Button variant="outlined" size="small">Today</Button>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <TextField
          size="small"
          placeholder="Search events"
          variant="outlined"
          sx={{ display: { xs: 'none', md: 'block' } }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
        />
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={onViewChange}
          aria-label="calendar view"
        >
          <ToggleButton value="month" aria-label="month view">Month</ToggleButton>
          <ToggleButton value="week" aria-label="week view">Week</ToggleButton>
          <ToggleButton value="day" aria-label="day view">Day</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Toolbar>
  );
};

export default CalendarHeader;