import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  PlayArrow,
  Download,
  Delete,
  Videocam,
  CloudDone,
} from '@mui/icons-material';

export default function RecordingsPage() {
  const [recordings] = useState([
    { id: 'rec-01', title: 'Q3 Enterprise Architecture Sync', date: 'Aug 8, 2026', duration: '45 mins', size: '240 MB', type: 'Cloud' },
    { id: 'rec-02', title: 'Security & Compliance Review', date: 'Aug 5, 2026', duration: '60 mins', size: '380 MB', type: 'Cloud' },
    { id: 'rec-03', title: 'Design System Sprint Walkthrough', date: 'Aug 2, 2026', duration: '30 mins', size: '150 MB', type: 'Local' },
  ]);

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Meeting Recordings</Typography>
          <Typography variant="body2" color="text.secondary">View, play, and download your cloud and local meeting recordings</Typography>
        </Box>
        <Chip icon={<CloudDone />} label="Cloud Storage: 2.4 GB / 10 GB Used" color="primary" variant="outlined" />
      </Box>

      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell fontWeight="bold">Recording Name</TableCell>
              <TableCell fontWeight="bold">Date Recorded</TableCell>
              <TableCell fontWeight="bold">Duration</TableCell>
              <TableCell fontWeight="bold">File Size</TableCell>
              <TableCell fontWeight="bold">Storage Type</TableCell>
              <TableCell fontWeight="bold" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordings.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Videocam color="primary" />
                    <Typography variant="subtitle2" fontWeight="bold">{row.title}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>
                  <Chip label={row.type} size="small" color={row.type === 'Cloud' ? 'primary' : 'default'} />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button variant="contained" size="small" startIcon={<PlayArrow />}>Play</Button>
                    <IconButton size="small"><Download fontSize="small" /></IconButton>
                    <IconButton size="small" color="error"><Delete fontSize="small" /></IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
