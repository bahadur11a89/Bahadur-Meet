import React, { useState } from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery, ToggleButtonGroup, ToggleButton, Tooltip, Button } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import IosShareIcon from '@mui/icons-material/IosShare';
import SearchToolbar from '../SearchToolbar/SearchToolbar';
import HistoryFilters from '../HistoryFilters/HistoryFilters';
import MeetingHistoryTable from '../MeetingHistoryTable/MeetingHistoryTable';
import MeetingHistoryCard from '../MeetingHistoryCard/MeetingHistoryCard';
import MeetingDetailsDialog from '../MeetingDetailsDialog/MeetingDetailsDialog';
import ExportHistoryDialog from '../ExportHistoryDialog/ExportHistoryDialog';

const demoMeetings = [
  { id: '812-456-7890', name: 'Project Phoenix Standup', host: 'Alice', participants: 8, startTime: '10:00 AM', duration: '30 min', status: 'Completed', date: 'Oct 26, 2023' },
  { id: '987-654-3210', name: 'Q4 Marketing Strategy', host: 'David', participants: 12, startTime: '11:30 AM', duration: '1 hour', status: 'Completed', date: 'Oct 26, 2023' },
  { id: '111-222-3333', name: 'Client Onboarding', host: 'You', participants: 3, startTime: '2:00 PM', duration: '45 min', status: 'Scheduled', date: 'Oct 27, 2023' },
  { id: '555-666-7777', name: 'Design Review', host: 'Charlie', participants: 5, startTime: '4:00 PM', duration: '1 hour', status: 'Cancelled', date: 'Oct 25, 2023' },
];

const MeetingHistory = () => {
  const [view, setView] = useState('table');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleViewChange = (event, newView) => {
    if (newView !== null) setView(newView);
  };

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setDetailsOpen(true);
  };

  const currentView = isMobile ? 'grid' : view;

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Meeting History</Typography>
          <Box>
            <Button variant="outlined" startIcon={<IosShareIcon />} onClick={() => setExportOpen(true)} sx={{ mr: 2 }}>Export</Button>
            {!isMobile && (
              <ToggleButtonGroup value={view} exclusive onChange={handleViewChange}>
                <Tooltip title="Table View"><ToggleButton value="table"><TableRowsIcon /></ToggleButton></Tooltip>
                <Tooltip title="Grid View"><ToggleButton value="grid"><GridViewIcon /></ToggleButton></Tooltip>
              </ToggleButtonGroup>
            )}
          </Box>
        </Box>
        <SearchToolbar />
        <HistoryFilters />
        {currentView === 'table' ? (
          <MeetingHistoryTable meetings={demoMeetings} onViewDetails={handleViewDetails} />
        ) : (
          <Grid container spacing={3}>
            {demoMeetings.map(meeting => (
              <Grid item key={meeting.id} xs={12} sm={6} md={4}><MeetingHistoryCard meeting={meeting} onViewDetails={() => handleViewDetails(meeting)} /></Grid>
            ))}
          </Grid>
        )}
      </Box>
      <MeetingDetailsDialog open={detailsOpen} onClose={() => setDetailsOpen(false)} meeting={selectedMeeting} />
      <ExportHistoryDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </>
  );
};

export default MeetingHistory;