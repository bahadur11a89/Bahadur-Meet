import React from 'react';
import { Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const statusConfig = {
  Connected: { icon: <CheckCircleOutlineIcon />, color: 'success' },
  'Poor Network': { icon: <WarningAmberIcon />, color: 'warning' },
  Reconnecting: { icon: <WifiOffIcon />, color: 'warning' },
  Disconnected: { icon: <WifiOffIcon />, color: 'error' },
};

const ConnectionStatus = React.memo(({ status }) => {
  const config = statusConfig[status] || { color: 'default', icon: null };

  return (
    <Chip
      icon={config.icon}
      label={status}
      color={config.color}
      size="small"
      variant="outlined"
    />
  );
});

export default ConnectionStatus;