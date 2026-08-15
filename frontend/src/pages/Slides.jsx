import React, { useState, useEffect, useCallback } from 'react';
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
  Slideshow as SlideshowIcon,
  Add,
  Delete,
  Save,
} from '@mui/icons-material';
import { slideService } from '../services/slide.service';

export default function SlidesPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDeck, setActiveDeck] = useState(null);
  const [slides, setSlides] = useState([{ title: 'Welcome Slide', content: 'Slide content' }]);

  // Dialog state
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState('');

  const fetchSlideDecks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await slideService.getSlideDecks();
      const list = res.data?.slideDecks || res.data?.data || res.slideDecks || [];
      setDecks(Array.isArray(list) ? list : []);
      setActiveDeck((prevActive) => {
        if (list.length > 0 && !prevActive) {
          setSlides(Array.isArray(list[0].slides) ? list[0].slides : [{ title: 'Welcome Slide', content: 'Slide content' }]);
          return list[0];
        }
        return prevActive;
      });
    } catch (err) {
      console.error('Failed to load slide decks:', err);
      setError('Failed to load presentation slides.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlideDecks();
  }, [fetchSlideDecks]);

  const handleCreateDeck = async () => {
    if (!title.trim()) return;
    try {
      const res = await slideService.createSlideDeck({
        title: title.trim(),
        slides: [{ title: 'Overview', content: 'Key objectives and topics.' }]
      });
      const created = res.data?.data || res.data || null;
      setTitle('');
      setOpenCreate(false);
      await fetchSlideDecks();
      if (created) {
        setActiveDeck(created);
        setSlides(created.slides || [{ title: 'Overview', content: 'Key objectives and topics.' }]);
      }
    } catch (err) {
      console.error('Failed to create slide deck:', err);
      setError('Failed to create slide deck.');
    }
  };

  const handleDeleteDeck = async (id) => {
    try {
      await slideService.deleteSlideDeck(id);
      if (activeDeck && (activeDeck._id === id || activeDeck.id === id)) {
        setActiveDeck(null);
      }
      fetchSlideDecks();
    } catch (err) {
      console.error('Failed to delete slide deck:', err);
      setError('Failed to delete slide deck.');
    }
  };

  const handleAddSlide = () => {
    setSlides([...slides, { title: `Slide ${slides.length + 1}`, content: 'Content details...' }]);
  };

  const handleSaveDeck = async () => {
    if (!activeDeck) return;
    try {
      await slideService.updateSlideDeck(activeDeck._id || activeDeck.id, { slides });
      fetchSlideDecks();
    } catch (err) {
      console.error('Failed to save slide deck:', err);
      setError('Failed to save presentation slides.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <SlideshowIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Presentation Slides</Typography>
            <Typography variant="body2" color="text.secondary">Slide deck creator and presentation mode</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenCreate(true)}>
          New Slide Deck
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Left Column: Decks List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Slide Decks</Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : decks.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
              <Typography variant="body2" color="text.secondary">No slide decks created yet.</Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {decks.map((d) => (
                <Card
                  variant="outlined"
                  key={d._id || d.id}
                  sx={{
                    borderRadius: 3,
                    cursor: 'pointer',
                    borderColor: (activeDeck?._id === d._id || activeDeck?.id === d.id) ? 'primary.main' : 'divider',
                    bgcolor: (activeDeck?._id === d._id || activeDeck?.id === d.id) ? 'rgba(14, 114, 237, 0.04)' : 'background.paper',
                  }}
                  onClick={() => {
                    setActiveDeck(d);
                    setSlides(Array.isArray(d.slides) ? d.slides : []);
                  }}
                >
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">{d.title}</Typography>
                      <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); handleDeleteDeck(d._id || d.id); }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Right Column: Slide Editor */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                {activeDeck ? activeDeck.title : 'Slide Editor'}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small" startIcon={<Add />} onClick={handleAddSlide} disabled={!activeDeck}>Add Slide</Button>
                <Button variant="contained" size="small" startIcon={<Save />} onClick={handleSaveDeck} disabled={!activeDeck}>Save Deck</Button>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              {slides.map((s, idx) => (
                <Paper variant="outlined" key={idx} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                  <TextField
                    label={`Slide ${idx + 1} Title`}
                    fullWidth
                    value={s.title || ''}
                    onChange={(e) => {
                      const next = [...slides];
                      next[idx].title = e.target.value;
                      setSlides(next);
                    }}
                    sx={{ mb: 1.5 }}
                    size="small"
                  />
                  <TextField
                    label="Slide Content"
                    fullWidth
                    multiline
                    rows={3}
                    value={s.content || ''}
                    onChange={(e) => {
                      const next = [...slides];
                      next[idx].content = e.target.value;
                      setSlides(next);
                    }}
                    size="small"
                  />
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Create Deck Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Create New Slide Deck</DialogTitle>
        <DialogContent dividers>
          <TextField label="Deck Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 1 }} required />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateDeck} disabled={!title.trim()}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
