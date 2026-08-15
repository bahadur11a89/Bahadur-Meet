import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper as MuiPaper,
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
  Description as DescriptionIcon,
  Add,
  Delete,
} from '@mui/icons-material';
import { paperService } from '../services/paper.service';

export default function PaperPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDoc, setActiveDoc] = useState(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  // Create Dialog
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState('');

  const saveTimeoutRef = useRef(null);

  const fetchPaperDocs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await paperService.getPaperDocs();
      const list = res.data?.paperDocs || res.data?.data || res.paperDocs || [];
      setDocs(Array.isArray(list) ? list : []);
      setActiveDoc((prevActive) => {
        if (list.length > 0 && !prevActive) {
          setContent(list[0].content || '');
          return list[0];
        }
        return prevActive;
      });
    } catch (err) {
      console.error('Failed to load paper documents:', err);
      setError('Failed to load paper documents.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaperDocs();
  }, [fetchPaperDocs]);

  const handleCreatePaper = async () => {
    if (!title.trim()) return;
    try {
      const res = await paperService.createPaperDoc({ title: title.trim(), content: '' });
      const created = res.data?.data || res.data || null;
      setTitle('');
      setOpenCreate(false);
      await fetchPaperDocs();
      if (created) {
        setActiveDoc(created);
        setContent('');
      }
    } catch (err) {
      console.error('Failed to create paper doc:', err);
      setError('Failed to create document.');
    }
  };

  const handleDeletePaper = async (id) => {
    try {
      await paperService.deletePaperDoc(id);
      if (activeDoc && (activeDoc._id === id || activeDoc.id === id)) {
        setActiveDoc(null);
        setContent('');
      }
      fetchPaperDocs();
    } catch (err) {
      console.error('Failed to delete paper doc:', err);
      setError('Failed to delete document.');
    }
  };

  const handleContentChange = (e) => {
    const val = e.target.value;
    setContent(val);

    // Debounced autosave
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      if (activeDoc) {
        setSaving(true);
        paperService.updatePaperDoc(activeDoc._id || activeDoc.id, { content: val })
          .then(() => setSaving(false))
          .catch((err) => {
            console.error('Autosave error:', err);
            setSaving(false);
          });
      }
    }, 1500);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <DescriptionIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Paper Documents</Typography>
            <Typography variant="body2" color="text.secondary">Collaborative document editing and specs</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenCreate(true)}>
          New Document
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Left Column: Documents List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>My Documents</Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : docs.length === 0 ? (
            <MuiPaper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
              <Typography variant="body2" color="text.secondary">No documents created yet.</Typography>
            </MuiPaper>
          ) : (
            <Stack spacing={2}>
              {docs.map((d) => (
                <Card
                  variant="outlined"
                  key={d._id || d.id}
                  sx={{
                    borderRadius: 3,
                    cursor: 'pointer',
                    borderColor: (activeDoc?._id === d._id || activeDoc?.id === d.id) ? 'primary.main' : 'divider',
                    bgcolor: (activeDoc?._id === d._id || activeDoc?.id === d.id) ? 'rgba(14, 114, 237, 0.04)' : 'background.paper',
                  }}
                  onClick={() => {
                    setActiveDoc(d);
                    setContent(d.content || '');
                  }}
                >
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">{d.title}</Typography>
                      <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); handleDeletePaper(d._id || d.id); }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Right Column: Editor */}
        <Grid item xs={12} md={8}>
          <MuiPaper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                {activeDoc ? activeDoc.title : 'Editor'}
              </Typography>
              {saving && <Typography variant="caption" color="text.secondary">Saving...</Typography>}
            </Stack>
            <TextField
              fullWidth
              multiline
              rows={16}
              value={content}
              onChange={handleContentChange}
              placeholder="Write specs, requirements, or documentation..."
              disabled={!activeDoc}
            />
          </MuiPaper>
        </Grid>
      </Grid>

      {/* Create Paper Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Create New Paper Document</DialogTitle>
        <DialogContent dividers>
          <TextField label="Document Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 1 }} required />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreatePaper} disabled={!title.trim()}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
