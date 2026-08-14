import React from 'react';
import { Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

const statusConfig = {
  Accepted: { icon: <CheckCircleOutlineIcon />, color: 'success' },
  Pending: { icon: <ScheduleOutlinedIcon />, color: 'warning' },
  Declined: { icon: <CancelOutlinedIcon />, color: 'error' },
  Maybe: { icon: <HelpOutlineIcon />, color: 'info' },
};

const RSVPStatusChip = ({ status }) => {
  const config = statusConfig[status] || { color: 'default' };

  return (
    <Chip icon={config.icon} label={status} color={config.color} size="small" variant="outlined" />
  );
};

export default RSVPStatusChip;