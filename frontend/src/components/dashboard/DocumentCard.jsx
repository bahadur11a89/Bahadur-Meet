import React from 'react';
import { Card, CardContent, Typography, Stack, Chip, Avatar } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import styles from './DocumentCard.module.css';

const statusColors = {
  Draft: 'default',
  Review: 'warning',
  Approved: 'success',
  Archived: 'default',
};

const DocumentCard = ({ doc }) => {
  return (
    <Card variant="outlined" className={styles.docCard}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Avatar variant="rounded" sx={{ bgcolor: 'action.hover' }}><DescriptionIcon color="primary" /></Avatar>
          <Chip label={doc.status} color={statusColors[doc.status]} size="small" />
        </Stack>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{doc.title}</Typography>
        <Typography variant="caption" color="text.secondary">Last updated: {doc.lastUpdated}</Typography>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;