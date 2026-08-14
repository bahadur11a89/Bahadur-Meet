import React from 'react';
import { Stack, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const FilterSelect = ({ label, options }) => (
  <FormControl size="small" sx={{ minWidth: 150, flexGrow: 1 }}>
    <InputLabel>{label}</InputLabel>
    <Select label={label} defaultValue="">
      {options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
    </Select>
  </FormControl>
);

const HistoryFilters = () => {
  return (
    <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2, mb: 2 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <FilterSelect label="Status" options={['Completed', 'Scheduled', 'Cancelled', 'Live']} />
        <FilterSelect label="Type" options={['Instant', 'Scheduled', 'Recurring']} />
        <FilterSelect label="Duration" options={['< 30min', '30-60min', '> 60min']} />
        <FilterSelect label="Sort By" options={['Newest', 'Oldest', 'Duration']} />
      </Stack>
    </Box>
  );
};

export default HistoryFilters;