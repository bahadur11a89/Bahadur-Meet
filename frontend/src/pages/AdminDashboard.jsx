import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { get } from '../services/apiService';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  People,
  VideoCall,
  Storage,
  Security,
  BarChart,
} from '@mui/icons-material';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (user && user.role !== 'ADMIN') return;

    const fetchAdminData = async () => {
      setLoading(true);
      setError(null);
      try {
        const statsRes = await get('/admin/stats');
        setStats(statsRes.data?.stats || statsRes.stats || null);

        const usersRes = await get('/admin/users');
        const rawUsers = usersRes.data?.users || usersRes.users || [];
        setUsersList(Array.isArray(rawUsers) ? rawUsers : []);
      } catch (err) {
        console.error('Admin API error:', err);
        setError(err.response?.status === 403 ? 'Access Denied: You do not have administrator permissions.' : 'Failed to load admin portal data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [user]);

  if (user && user.role !== 'ADMIN') {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Access Denied: You must be an administrator to access the admin portal.</Alert>
      </Box>
    );
  }

  const statCards = [
    { title: 'Total Enterprise Users', value: stats?.totalUsers ?? usersList.length, change: 'Registered Users', icon: <People fontSize="large" color="primary" /> },
    { title: 'Active Meetings Today', value: stats?.activeMeetings ?? 0, change: 'Live Meetings', icon: <VideoCall fontSize="large" color="success" /> },
    { title: 'Total Meetings Created', value: stats?.totalMeetings ?? 0, change: 'Database Records', icon: <Storage fontSize="large" color="warning" /> },
    { title: 'Security Status', value: 'Protected', change: 'JWT & Admin Guards Active', icon: <Security fontSize="large" color="info" /> },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <BarChart sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Enterprise Admin Portal</Typography>
            <Typography variant="body2" color="text.secondary">Manage organization users, meeting analytics, and system status</Typography>
          </Box>
        </Box>
        <Button variant="contained">Export Analytics Report</Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {statCards.map((s, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  {s.icon}
                  <Chip label="Live" size="small" color="success" variant="outlined" />
                </Stack>
                <Typography variant="h4" fontWeight="bold">{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.title}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" mt={1}>{s.change}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* User Management Table */}
      <Typography variant="h6" fontWeight="bold" mb={2}>Organization Users</Typography>
      {loading ? (
        <Box textAlign="center" py={6}>
          <CircularProgress />
        </Box>
      ) : usersList.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">No registered users found.</Typography>
        </Paper>
      ) : (
        <Paper variant="outlined" sx={{ borderRadius: 3, overflowX: 'auto' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell fontWeight="bold">User Name</TableCell>
                <TableCell fontWeight="bold">Username</TableCell>
                <TableCell fontWeight="bold">Role</TableCell>
                <TableCell fontWeight="bold">Personal Meeting ID</TableCell>
                <TableCell fontWeight="bold">Joined Date</TableCell>
                <TableCell fontWeight="bold" align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((row) => (
                <TableRow key={row._id || row.id} hover>
                  <TableCell fontWeight="bold">{row.name}</TableCell>
                  <TableCell>@{row.username}</TableCell>
                  <TableCell><Chip label={row.role || 'USER'} size="small" color={row.role === 'ADMIN' ? 'primary' : 'default'} /></TableCell>
                  <TableCell>{row.personalMeetingId || 'N/A'}</TableCell>
                  <TableCell>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell align="right">
                    <Button size="small">Manage User</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
