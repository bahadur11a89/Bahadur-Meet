import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
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
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Task as TaskIcon,
  Add,
  Search,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { taskService } from '../services/task.service';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter) params.status = statusFilter;
      const res = await taskService.getTasks(params);
      const list = res.data?.tasks || res.data?.data || res.tasks || [];
      setTasks(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Failed to load action tasks.');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async () => {
    if (!title.trim()) return;
    try {
      await taskService.createTask({
        title: title.trim(),
        description: description.trim(),
        priority,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setOpenDialog(false);
      fetchTasks();
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Failed to create task.');
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
    try {
      await taskService.updateTask(task._id || task.id, { status: nextStatus });
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <TaskIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Action Tasks</Typography>
            <Typography variant="body2" color="text.secondary">Team task tracking and action item management</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
          New Task
        </Button>
      </Box>

      {/* Filters */}
      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap" gap={2}>
        <TextField
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 240 }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" py={8}>
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Paper variant="outlined" sx={{ borderRadius: 3, p: 6, textAlign: 'center', bgcolor: 'grey.50' }}>
          <TaskIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" fontWeight="600">
            No Tasks Available
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Click "New Task" to assign action items and track meeting tasks.
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {tasks.map((t) => (
            <Card variant="outlined" key={t._id || t.id} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Checkbox
                      checked={t.status === 'completed'}
                      onChange={() => handleToggleStatus(t)}
                      icon={<RadioButtonUnchecked />}
                      checkedIcon={<CheckCircle color="success" />}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ textDecoration: t.status === 'completed' ? 'line-through' : 'none', color: t.status === 'completed' ? 'text.disabled' : 'text.primary' }}
                      >
                        {t.title}
                      </Typography>
                      {t.description && (
                        <Typography variant="body2" color="text.secondary">
                          {t.description}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Chip
                      label={(t.priority || 'medium').toUpperCase()}
                      size="small"
                      color={t.priority === 'high' ? 'error' : t.priority === 'low' ? 'default' : 'warning'}
                    />
                    <IconButton size="small" color="error" onClick={() => handleDeleteTask(t._id || t.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Create Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Create New Action Task</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Task Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} required />
            <TextField label="Description" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select value={priority} label="Priority" onChange={(e) => setPriority(e.target.value)}>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateTask} disabled={!title.trim()}>Create Task</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
