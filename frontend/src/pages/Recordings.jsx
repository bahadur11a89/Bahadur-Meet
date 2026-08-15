import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CloudDone,
  VideocamOff,
  PlayArrow,
  Download,
  Delete,
  Videocam,
  Search,
  Add,
} from '@mui/icons-material';
import { recordingService } from '../services/recording.service';

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [activePlayUrl, setActivePlayUrl] = useState(null);

  const fetchRecordings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await recordingService.getAllRecordings();
      const list = res.data?.recordings || res.data || res.recordings || [];
      setRecordings(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load recordings:', err);
      setError('Failed to load meeting recordings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  const handleSaveRecording = async () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    try {
      await recordingService.createRecording({
        title: newTitle.trim(),
        storageUrl: newUrl.trim(),
      });
      setNewTitle('');
      setNewUrl('');
      setOpenAdd(false);
      fetchRecordings();
    } catch (err) {
      console.error('Failed to save recording:', err);
      setError('Failed to save recording metadata.');
    }
  };

  const handleDeleteRecording = async (id) => {
    try {
      await recordingService.deleteRecording(id);
      fetchRecordings();
    } catch (err) {
      console.error('Failed to delete recording:', err);
      setError('Failed to delete recording.');
    }
  };

  const filteredRecordings = recordings.filter((r) =>
    (r.title || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Meeting Recordings</Typography>
          <Typography variant="body2" color="text.secondary">View, play, and download your cloud and local meeting recordings</Typography>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenAdd(true)}>
            Add Recording
          </Button>
          <Chip icon={<CloudDone />} label={`Cloud Storage: ${recordings.length} Saved`} color="primary" variant="outlined" />
        </Stack>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search recordings by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" py={8}>
          <CircularProgress />
        </Box>
      ) : filteredRecordings.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <VideocamOff sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" fontWeight="600">
            No Meeting Recordings Available
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            No active recordings were found for your account matching your search.
          </Typography>
        </Paper>
      ) : (
        <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell fontWeight="bold">Recording Name</TableCell>
                <TableCell fontWeight="bold">Date Recorded</TableCell>
                <TableCell fontWeight="bold">Duration</TableCell>
                <TableCell fontWeight="bold">Storage Type</TableCell>
                <TableCell fontWeight="bold" align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRecordings.map((row) => (
                <TableRow key={row._id || row.id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Videocam color="primary" />
                      <Typography variant="subtitle2" fontWeight="bold">{row.title || 'Untitled Recording'}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>{row.duration || '30 mins'}</TableCell>
                  <TableCell>
                    <Chip label={row.type || 'Cloud'} size="small" color="primary" />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      {row.storageUrl && (
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<PlayArrow />}
                          onClick={() => setActivePlayUrl(row.storageUrl)}
                        >
                          Play
                        </Button>
                      )}
                      {row.storageUrl && (
                        <IconButton size="small" component="a" href={row.storageUrl} download target="_blank">
                          <Download fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton size="small" color="error" onClick={() => handleDeleteRecording(row._id || row.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Add Recording Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold">Save Recording Metadata</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Recording Title" fullWidth value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Sprint Planning Recording" />
            <TextField label="Storage URL / Video Link" fullWidth value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://storage.provider.com/rec-101.mp4" />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveRecording} disabled={!newTitle.trim() || !newUrl.trim()}>Save Recording</Button>
        </DialogActions>
      </Dialog>

      {/* Video Playback Modal */}
      <Dialog open={Boolean(activePlayUrl)} onClose={() => setActivePlayUrl(null)} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">Video Playback</DialogTitle>
        <DialogContent dividers>
          {activePlayUrl && (
            <Box text-align="center">
              <video src={activePlayUrl} controls style={{ width: '100%', maxHeight: '480px', borderRadius: '8px' }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivePlayUrl(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
