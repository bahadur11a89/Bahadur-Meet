import React from 'react';
import { Grid, Card, CardActionArea, Typography, Stack } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PollIcon from '@mui/icons-material/Poll';
import DashboardIcon from '@mui/icons-material/Dashboard';

const links = [
  { title: 'Create Team', icon: <GroupsIcon /> },
  { title: 'Schedule Meeting', icon: <CalendarMonthIcon /> },
  { title: 'Upload File', icon: <UploadFileIcon /> },
  { title: 'Invite Members', icon: <PersonAddIcon /> },
  { title: 'Create Poll', icon: <PollIcon /> },
  { title: 'Open Whiteboard', icon: <DashboardIcon /> },
];

const QuickLinks = () => {
  return (
    <Grid container spacing={2}>
      {links.map((link, index) => (
        <Grid item key={index} xs={6} sm={4} md={2}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardActionArea sx={{ p: 2, textAlign: 'center' }}>
              <Stack alignItems="center" spacing={1}>
                {link.icon}
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>{link.title}</Typography>
              </Stack>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickLinks;