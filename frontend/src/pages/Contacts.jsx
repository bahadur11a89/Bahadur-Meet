import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search,
  PersonAdd,
  PeopleOutline,
  Videocam,
  Chat,
  Circle,
} from '@mui/icons-material';
import { userService } from '../services/user.service';

export default function ContactsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await userService.getContacts(search);
        const list = res.data?.contacts || res.data?.data || res.contacts || [];
        setContacts(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error('Failed to load contacts:', err);
        setError('Failed to load contacts directory.');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [search]);

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Contacts</Typography>
          <Typography variant="body2" color="text.secondary">Connect and message your team members</Typography>
        </Box>
        <Button variant="contained" startIcon={<PersonAdd />} onClick={() => setOpenAdd(true)}>
          Add Contact
        </Button>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search contacts by name or username..."
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
      ) : contacts.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <PeopleOutline sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" fontWeight="600">
            No Contacts Available
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Your contact directory is currently empty. Click "Add Contact" to invite team members.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {contacts.map((c) => (
            <Grid item xs={12} sm={6} md={3} key={c.id || c._id}>
              <Card variant="outlined" sx={{ borderRadius: 3, textAlign: 'center', p: 1 }}>
                <CardContent>
                  <Box position="relative" display="inline-block" mb={2}>
                    <Avatar sx={{ width: 64, height: 64, mx: 'auto', bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                      {(c.name || c.username || 'U').charAt(0).toUpperCase()}
                    </Avatar>
                    <Circle
                      sx={{
                        position: 'absolute',
                        bottom: 2,
                        right: 2,
                        fontSize: 14,
                        color: c.status === 'online' ? 'success.main' : 'text.disabled',
                      }}
                    />
                  </Box>
                  <Typography variant="h6" fontWeight="bold" noWrap>{c.name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>@{c.username}</Typography>
                  <Chip
                    label={(c.role || 'USER').toUpperCase()}
                    size="small"
                    color={c.role === 'ADMIN' ? 'secondary' : 'default'}
                    sx={{ my: 1.5 }}
                  />
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Videocam />}
                      onClick={async () => {
                        try {
                          const res = await meetingService.createMeeting({ title: `Meeting with ${c.name}` });
                          const code = res.data?.data?.meetingCode || res.data?.meetingCode || res.meetingCode || `meet-${c.id}`;
                          navigate(`/meeting/${code}`);
                        } catch (err) {
                          console.error('Instant meeting error:', err);
                          navigate(`/meeting/meet-${c.id}`);
                        }
                      }}
                    >
                      Meet
                    </Button>
                    <Button variant="outlined" size="small" startIcon={<Chat />} onClick={() => navigate('/chat')}>
                      Chat
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Contact Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Add New Contact</DialogTitle>
        <DialogContent dividers>
          <TextField label="Email / Username" fullWidth sx={{ mt: 1 }} placeholder="colleague@enterprise.com" />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenAdd(false)}>Add Contact</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
