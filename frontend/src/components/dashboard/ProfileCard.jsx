import React from 'react';
import { Card, CardContent, Typography, Stack, Button, Avatar, Badge, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShareIcon from '@mui/icons-material/Share';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': { '0%': { transform: 'scale(.8)', opacity: 1 }, '100%': { transform: 'scale(2.4)', opacity: 0 } },
}));

const ProfileCard = () => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 4, p: 2, textAlign: 'center' }}>
      <CardContent>
        <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
          <Avatar alt="Max Mustermann" src="/static/images/avatar/1.jpg" sx={{ width: 120, height: 120, mb: 2, mx: 'auto' }} />
        </StyledBadge>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Max Mustermann</Typography>
        <Typography color="text.secondary">Lead Engineer</Typography>
        <Typography variant="body2" color="text.secondary">max.mustermann@example.com</Typography>
        <Box mt={3}>
          <Stack spacing={1}>
            <Button variant="contained" startIcon={<EditIcon />}>Edit Profile</Button>
            <Button variant="outlined" startIcon={<CameraAltIcon />}>Change Avatar</Button>
            <Button startIcon={<ShareIcon />}>Share Profile</Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;