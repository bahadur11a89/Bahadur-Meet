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
  Dashboard as DashboardIcon,
  Add,
  Delete,
  Edit,
} from '@mui/icons-material';
import { canvasService } from '../services/canvas.service';

export default function CanvasPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dialog state
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState('');

  const fetchCanvasDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await canvasService.getCanvasDocs();
      const list = res.data?.canvasDocs || res.data?.data || res.canvasDocs || [];
      setDocs(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load canvas documents:', err);
      setError('Failed to load project canvas documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCanvasDocs();
  }, []);

  const handleCreateCanvas = async () => {
    if (!title.trim()) return;
    try {
      await canvasService.createCanvasDoc({ title: title.trim() });
      setTitle('');
      setOpenCreate(false);
      fetchCanvasDocs();
    } catch (err) {
      console.error('Failed to create canvas:', err);
      setError('Failed to save canvas document.');
    }
  };

  const handleDeleteCanvas = async (id) => {
    try {
      await canvasService.deleteCanvasDoc(id);
      fetchCanvasDocs();
    } catch (err) {
      console.error('Failed to delete canvas:', err);
      setError('Failed to delete canvas document.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <DashboardIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Project Canvas</Typography>
            <Typography variant="body2" color="text.secondary">Infinite project workspace and flow builder</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenCreate(true)}>
          New Canvas
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" py={8}>
          <CircularProgress />
        </Box>
      ) : docs.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <DashboardIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" fontWeight="600">
            No Project Canvas Created
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Click "New Canvas" to build visual project flows and diagrams.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {docs.map((d) => (
            <Grid item xs={12} sm={6} md={4} key={d._id || d.id}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="bold" noWrap>{d.title}</Typography>
                    <IconButton size="small" color="error" onClick={() => handleDeleteCanvas(d._id || d.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Updated: {d.updatedAt ? new Date(d.updatedAt).toLocaleDateString() : 'Recent'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Canvas Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Create New Project Canvas</DialogTitle>
        <DialogContent dividers>
          <TextField label="Canvas Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 1 }} required />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateCanvas} disabled={!title.trim()}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
