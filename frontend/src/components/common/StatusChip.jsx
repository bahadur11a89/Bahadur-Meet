import React from 'react';
import { Chip } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CircleIcon from '@mui/icons-material/Circle';

const statusConfig = {
  Scheduled: { icon: <ScheduleIcon />, color: 'info' },
  Live: { icon: <PlayCircleIcon />, color: 'error' },
  Completed: { icon: <CheckCircleIcon />, color: 'success' },
  Cancelled: { icon: <CancelIcon />, color: 'warning' },
  Recording: { icon: <CircleIcon sx={{ color: 'red' }} />, color: 'default' },
  Muted: { icon: <CircleIcon sx={{ color: 'grey' }} />, color: 'default' },
  Online: { icon: <CircleIcon />, color: 'success' },
  Offline: { icon: <CircleIcon />, color: 'disabled' },
  Success: { color: 'success' },
  Active: { color: 'success' },
  Info: { color: 'info' },
  Processing: { color: 'warning' },
};

const StatusChip = React.memo(({ status }) => {
  const config = statusConfig[status] || { color: 'default' };

  return (
    <Chip
      icon={config.icon}
      label={status}
      color={config.color}
      size="small"
      sx={{
        fontWeight: 'medium',
        color: config.color !== 'default' ? 'white' : 'inherit',
      }}
    />
  );
});

export default StatusChip;