import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Chip, IconButton, Tooltip, Stack } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LinkIcon from '@mui/icons-material/Link';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ConnectionStatus from '../ConnectionStatus/ConnectionStatus';
import MeetingInfo from '../MeetingInfo/MeetingInfo';
import styles from './MeetingHeader.module.css';

const MeetingHeader = () => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0} className={styles.header}>
        <Toolbar>
          <Box>
            <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold' }}>
              Project Phoenix Standup
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: 812 456 7890 | 00:15:32
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={2} alignItems="center">
            <ConnectionStatus status="Connected" />
            <Chip
              icon={<FiberManualRecordIcon />}
              label="Recording"
              color="error"
              size="small"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            />
            <Chip
              icon={<PeopleAltOutlinedIcon />}
              label="9"
              size="small"
              variant="outlined"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            />
            <Tooltip title="Copy Invite Link">
              <IconButton color="inherit" aria-label="Copy invite link">
                <LinkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Meeting Info">
              <IconButton color="inherit" onClick={() => setInfoOpen(true)} aria-label="Show meeting info">
                <InfoOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
      <MeetingInfo open={infoOpen} onClose={() => setInfoOpen(false)} />
    </>
  );
};

export default MeetingHeader;