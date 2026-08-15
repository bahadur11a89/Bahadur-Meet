import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Note as NoteIcon,
  Add,
  Search,
  Edit,
  Delete,
} from '@mui/icons-material';
import { noteService } from '../services/note.service';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await noteService.getNotes(search);
      const list = res.data?.notes || res.data?.data || res.notes || [];
      setNotes(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load notes:', err);
      setError('Failed to load notes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  const handleOpenCreate = () => {
    setEditId(null);
    setTitle('');
    setContent('');
    setCategory('General');
    setOpenDialog(true);
  };

  const handleOpenEdit = (note) => {
    setEditId(note._id || note.id);
    setTitle(note.title || '');
    setContent(note.content || '');
    setCategory(note.category || 'General');
    setOpenDialog(true);
  };

  const handleSaveNote = async () => {
    if (!title.trim()) return;
    try {
      if (editId) {
        await noteService.updateNote(editId, { title: title.trim(), content, category });
      } else {
        await noteService.createNote({ title: title.trim(), content, category });
      }
      setOpenDialog(false);
      fetchNotes();
    } catch (err) {
      console.error('Failed to save note:', err);
      setError('Failed to save note.');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await noteService.deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error('Failed to delete note:', err);
      setError('Failed to delete note.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <NoteIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Meeting Notes</Typography>
            <Typography variant="body2" color="text.secondary">Shared meeting scratchpad and rich documentation</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate}>
          New Note
        </Button>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search notes by title, content, or category..."
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
      ) : notes.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <NoteIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" fontWeight="600">
            No Notes Found
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Click "New Note" to record meeting documentation and action scratchpads.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {notes.map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n._id || n.id}>
              <Card variant="outlined" sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                    <Chip label={n.category || 'General'} size="small" color="primary" variant="outlined" />
                    <Stack direction="row" spacing={0.5}>
                      <IconButton size="small" onClick={() => handleOpenEdit(n)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteNote(n._id || n.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{n.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {n.content || 'No content added.'}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 2, pb: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Updated: {n.updatedAt ? new Date(n.updatedAt).toLocaleDateString() : 'Just now'}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Note Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight="bold">{editId ? 'Edit Note' : 'Create New Note'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Note Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
            <TextField label="Category" fullWidth value={category} onChange={(e) => setCategory(e.target.value)} placeholder="General, Architecture, Sprint..." />
            <TextField label="Note Content" fullWidth multiline rows={5} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write meeting notes or decisions here..." />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveNote} disabled={!title.trim()}>Save Note</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
