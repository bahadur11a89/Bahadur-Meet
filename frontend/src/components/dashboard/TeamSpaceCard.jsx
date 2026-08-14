import React from 'react';
import { Card, CardContent, Typography, Stack, Button, AvatarGroup, Avatar, Box } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import styles from './TeamSpaceCard.module.css';

const TeamSpaceCard = ({ space }) => {
  return (
    <Card variant="outlined" className={styles.spaceCard}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>{space.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40, mb: 2 }}>
          {space.description}
        </Typography>
        <Stack spacing={1} mb={2}>
          <Box className={styles.infoItem}>
            <GroupsIcon fontSize="small" color="action" />
            <Typography variant="body2" ml={1}>{space.members} Members</Typography>
          </Box>
          <Box className={styles.infoItem}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: '0.75rem' } }}>
              <Avatar />
              <Avatar />
              <Avatar />
            </AvatarGroup>
          </Box>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          Last activity: {space.lastActivity}
        </Typography>
        <Stack direction="row" spacing={1} mt={2}>
          <Button size="small" variant="outlined">Manage</Button>
          <Button size="small" variant="contained">Open</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TeamSpaceCard;