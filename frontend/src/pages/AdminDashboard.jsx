import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
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

  if (user && user.role !== 'ADMIN') {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="warning">Access Denied: You must be an administrator to access the admin portal.</Alert>
      </Box>
    );
  }
  const stats = [
    { title: 'Total Enterprise Users', value: '1,248', change: '+12% this month', icon: <People fontSize="large" color="primary" /> },
    { title: 'Active Meetings Today', value: '42', change: '840 total meeting hours', icon: <VideoCall fontSize="large" color="success" /> },
    { title: 'Cloud Storage Used', value: '480 GB', change: '48% of 1 TB limit', icon: <Storage fontSize="large" color="warning" /> },
    { title: 'Security Audits', value: 'Passed', change: 'AES-256 Enabled', icon: <Security fontSize="large" color="info" /> },
  ];

  const users = [
    { name: 'Alex Johnson', email: 'alex.j@enterprise.com', role: 'Admin', status: 'Active', joined: 'Jan 15, 2026' },
    { name: 'Sarah Connor', email: 'sarah.c@enterprise.com', role: 'Manager', status: 'Active', joined: 'Feb 10, 2026' },
    { name: 'David Miller', email: 'david.m@enterprise.com', role: 'User', status: 'Active', joined: 'Mar 22, 2026' },
    { name: 'Emily Zhang', email: 'emily.z@enterprise.com', role: 'User', status: 'Inactive', joined: 'Apr 05, 2026' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <BarChart sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Enterprise Admin Portal</Typography>
            <Typography variant="body2" color="text.secondary">Manage organization users, meeting analytics, and billing</Typography>
          </Box>
        </Box>
        <Button variant="contained">Export Analytics Report</Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((s, idx) => (
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
      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell fontWeight="bold">User Name</TableCell>
              <TableCell fontWeight="bold">Email Address</TableCell>
              <TableCell fontWeight="bold">Role</TableCell>
              <TableCell fontWeight="bold">Status</TableCell>
              <TableCell fontWeight="bold">Joined Date</TableCell>
              <TableCell fontWeight="bold" align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, idx) => (
              <TableRow key={idx} hover>
                <TableCell fontWeight="bold">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell><Chip label={row.role} size="small" color={row.role === 'Admin' ? 'primary' : 'default'} /></TableCell>
                <TableCell><Chip label={row.status} size="small" color={row.status === 'Active' ? 'success' : 'default'} /></TableCell>
                <TableCell>{row.joined}</TableCell>
                <TableCell align="right">
                  <Button size="small">Edit Role</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
