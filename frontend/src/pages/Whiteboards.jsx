import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Stack,
  IconButton,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Brush as BrushIcon,
  Add,
  Save,
  Delete,
  Clear,
} from '@mui/icons-material';
import { whiteboardService } from '../services/whiteboard.service';

export default function WhiteboardsPage() {
  const [whiteboards, setWhiteboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeBoard, setActiveBoard] = useState(null);

  // Dialog state
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState('');

  // Canvas drawing state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const fetchWhiteboards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await whiteboardService.getWhiteboards();
      const list = res.data?.whiteboards || res.data?.data || res.whiteboards || [];
      setWhiteboards(Array.isArray(list) ? list : []);
      setActiveBoard((prevActive) => {
        if (list.length > 0 && !prevActive) {
          return list[0];
        }
        return prevActive;
      });
    } catch (err) {
      console.error('Failed to load whiteboards:', err);
      setError('Failed to load whiteboards.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWhiteboards();
  }, [fetchWhiteboards]);

  const handleCreateBoard = async () => {
    if (!title.trim()) return;
    try {
      const res = await whiteboardService.createWhiteboard({ title: title.trim(), canvasData: [] });
      const created = res.data?.data || res.data || null;
      setTitle('');
      setOpenCreate(false);
      await fetchWhiteboards();
      if (created) setActiveBoard(created);
    } catch (err) {
      console.error('Failed to create whiteboard:', err);
      setError('Failed to create whiteboard.');
    }
  };

  const handleDeleteBoard = async (id) => {
    try {
      await whiteboardService.deleteWhiteboard(id);
      if (activeBoard && (activeBoard._id === id || activeBoard.id === id)) {
        setActiveBoard(null);
      }
      fetchWhiteboards();
    } catch (err) {
      console.error('Failed to delete whiteboard:', err);
      setError('Failed to delete whiteboard.');
    }
  };

  // Canvas Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#0E72ED';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveCanvas = async () => {
    if (!activeBoard) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    try {
      await whiteboardService.updateWhiteboard(activeBoard._id || activeBoard.id, {
        canvasData: [dataUrl]
      });
      fetchWhiteboards();
    } catch (err) {
      console.error('Failed to save canvas:', err);
      setError('Failed to save canvas drawing.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <BrushIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Whiteboards Workspace</Typography>
            <Typography variant="body2" color="text.secondary">Real-time collaborative visual canvas</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenCreate(true)}>
          New Whiteboard
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Left Column: Boards List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Saved Whiteboards</Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : whiteboards.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
              <Typography variant="body2" color="text.secondary">No whiteboards created yet.</Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {whiteboards.map((b) => (
                <Card
                  variant="outlined"
                  key={b._id || b.id}
                  sx={{
                    borderRadius: 3,
                    cursor: 'pointer',
                    borderColor: (activeBoard?._id === b._id || activeBoard?.id === b.id) ? 'primary.main' : 'divider',
                    bgcolor: (activeBoard?._id === b._id || activeBoard?.id === b.id) ? 'rgba(14, 114, 237, 0.04)' : 'background.paper',
                  }}
                  onClick={() => setActiveBoard(b)}
                >
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">{b.title}</Typography>
                      <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); handleDeleteBoard(b._id || b.id); }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Right Column: Interactive Canvas */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                {activeBoard ? activeBoard.title : 'Canvas'}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small" startIcon={<Clear />} onClick={clearCanvas}>Clear</Button>
                <Button variant="contained" size="small" startIcon={<Save />} onClick={handleSaveCanvas} disabled={!activeBoard}>Save Board</Button>
              </Stack>
            </Stack>
            <Box sx={{ border: '1px dashed #cbd5e1', borderRadius: 2, bgcolor: '#ffffff', cursor: 'crosshair', overflow: 'hidden' }}>
              <canvas
                ref={canvasRef}
                width={700}
                height={450}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ width: '100%', height: '450px', display: 'block' }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Create Whiteboard Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Create New Whiteboard</DialogTitle>
        <DialogContent dividers>
          <TextField label="Whiteboard Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 1 }} required />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateBoard} disabled={!title.trim()}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
