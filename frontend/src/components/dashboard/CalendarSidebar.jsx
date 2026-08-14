import React from 'react';
import { Box, Typography, Stack, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RepeatIcon from '@mui/icons-material/Repeat';
import styles from './CalendarSidebar.module.css';

const upcomingMeetings = [
  { title: 'Project Phoenix Standup', time: '10:00 AM' },
  { title: 'Q4 Marketing Strategy', time: '11:30 AM' },
];

const CalendarSidebar = ({ onScheduleClick }) => {
  return (
    <Stack className={styles.sidebarContainer}>
      <Box sx={{ p: 2 }}>
        <Button variant="contained" fullWidth startIcon={<AddIcon />} onClick={onScheduleClick}>
          Create Meeting
        </Button>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        {/* Mini Calendar Placeholder */}
        <Box sx={{ height: 250, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="caption" color="text.secondary">[Mini Calendar]</Typography>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Upcoming</Typography>
        <List disablePadding>
          {upcomingMeetings.map((meeting, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={meeting.title} secondary={meeting.time} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Stack spacing={1} sx={{ p: 2 }}>
        <Button startIcon={<ScheduleIcon />} size="small">Schedule Meeting</Button>
        <Button startIcon={<RepeatIcon />} size="small">Recurring Meeting</Button>
      </Stack>
    </Stack>
  );
};

export default CalendarSidebar;