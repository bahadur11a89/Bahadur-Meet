import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search,
  PersonAdd,
  Videocam,
  Chat,
  Circle,
} from '@mui/icons-material';

export default function ContactsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openAdd, setOpenAdd] = useState(false);

  const contacts = [
    { id: '1', name: 'Alex Johnson', email: 'alex.j@enterprise.com', role: 'Lead Architect', status: 'online' },
    { id: '2', name: 'Sarah Connor', email: 'sarah.c@enterprise.com', role: 'Product Manager', status: 'online' },
    { id: '3', name: 'David Miller', email: 'david.m@enterprise.com', role: 'Frontend Engineer', status: 'busy' },
    { id: '4', name: 'Emily Zhang', email: 'emily.z@enterprise.com', role: 'UX Designer', status: 'offline' },
  ];

  const filteredContacts = contacts.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

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
        placeholder="Search contacts by name or email..."
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

      {/* Contacts Grid */}
      <Grid container spacing={3}>
        {filteredContacts.map((c) => (
          <Grid item xs={12} sm={6} md={3} key={c.id}>
            <Card variant="outlined" sx={{ borderRadius: 3, textAlign: 'center', p: 1 }}>
              <CardContent>
                <Box position="relative" display="inline-block" mb={2}>
                  <Avatar sx={{ width: 64, height: 64, mx: 'auto', bgcolor: 'primary.main', fontSize: '1.5rem' }}>
                    {c.name.charAt(0)}
                  </Avatar>
                  <Circle
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      fontSize: 14,
                      color: c.status === 'online' ? 'success.main' : c.status === 'busy' ? 'warning.main' : 'text.disabled',
                    }}
                  />
                </Box>
                <Typography variant="h6" fontWeight="bold" noWrap>{c.name}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{c.role}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2} noWrap>{c.email}</Typography>
                <Chip
                  label={c.status.toUpperCase()}
                  size="small"
                  color={c.status === 'online' ? 'success' : c.status === 'busy' ? 'warning' : 'default'}
                  sx={{ mb: 2 }}
                />
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button variant="contained" size="small" startIcon={<Videocam />} onClick={() => navigate('/meeting/meet-' + c.id)}>
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

      {/* Add Contact Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Add New Contact</DialogTitle>
        <DialogContent dividers>
          <TextField label="Email Address" fullWidth sx={{ mt: 1 }} placeholder="colleague@enterprise.com" />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenAdd(false)}>Add Contact</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
