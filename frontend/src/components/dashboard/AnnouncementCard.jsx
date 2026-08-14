import React from 'react';
import { Card, CardContent, Typography, Stack, Chip, Button, Badge } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import styles from './AnnouncementCard.module.css';

const priorityColors = {
  High: 'error',
  Medium: 'warning',
  Low: 'info',
};

const AnnouncementCard = ({ announcement }) => {
  return (
    <Card variant="outlined" className={styles.announcementCard}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip label={announcement.priority} color={priorityColors[announcement.priority]} size="small" />
          {announcement.pinned && (
            <Badge color="secondary" variant="dot">
              <PushPinIcon fontSize="small" color="action" />
            </Badge>
          )}
        </Stack>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>{announcement.title}</Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>{announcement.description}</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            By {announcement.author} • {announcement.date}
          </Typography>
          <Button size="small">Read More</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;