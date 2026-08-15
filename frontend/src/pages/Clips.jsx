import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Add,
  Delete,
  PlayArrow,
} from '@mui/icons-material';
import { clipService } from '../services/clip.service';

export default function ClipsPage() {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dialog state
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [activePlayUrl, setActivePlayUrl] = useState(null);

  const fetchClips = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await clipService.getClips();
      const list = res.data?.clips || res.data?.data || res.clips || [];
      setClips(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load clips:', err);
      setError('Failed to load video clips.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClips();
  }, []);

  const handleCreateClip = async () => {
    if (!title.trim() || !url.trim()) return;
    try {
      await clipService.createClip({
        title: title.trim(),
        url: url.trim(),
        description: description.trim(),
      });
      setTitle('');
      setUrl('');
      setDescription('');
      setOpenCreate(false);
      fetchClips();
    } catch (err) {
      console.error('Failed to create clip:', err);
      setError('Failed to save video clip.');
    }
  };

  const handleDeleteClip = async (id) => {
    try {
      await clipService.deleteClip(id);
      fetchClips();
    } catch (err) {
      console.error('Failed to delete clip:', err);
      setError('Failed to delete clip.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <MovieIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Video Clips</Typography>
            <Typography variant="body2" color="text.secondary">Short meeting highlights and video messages</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenCreate(true)}>
          New Clip
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" py={8}>
          <CircularProgress />
        </Box>
      ) : clips.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <MovieIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" fontWeight="600">
            No Video Clips Saved
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Click "New Clip" to save meeting video snippets and video messages.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {clips.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c._id || c.id}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold" noWrap>{c.title}</Typography>
                    <IconButton size="small" color="error" onClick={() => handleDeleteClip(c._id || c.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {c.description || 'No description provided.'}
                  </Typography>
                  <Button variant="outlined" size="small" startIcon={<PlayArrow />} onClick={() => setActivePlayUrl(c.url)}>
                    Play Clip
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Clip Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Create New Video Clip</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Clip Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
            <TextField label="Video URL / Media Link" fullWidth value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="https://storage.provider.com/clip.mp4" />
            <TextField label="Description" fullWidth multiline rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateClip} disabled={!title.trim() || !url.trim()}>Save Clip</Button>
        </DialogActions>
      </Dialog>

      {/* Playback Dialog */}
      <Dialog open={Boolean(activePlayUrl)} onClose={() => setActivePlayUrl(null)} maxWidth="md" fullWidth>
        <DialogTitle fontWeight="bold">Play Video Clip</DialogTitle>
        <DialogContent dividers>
          {activePlayUrl && (
            <video src={activePlayUrl} controls style={{ width: '100%', maxHeight: '480px', borderRadius: '8px' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivePlayUrl(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
