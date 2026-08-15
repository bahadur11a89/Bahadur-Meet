import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
} from '@mui/material';
import {
  AutoAwesome,
  CheckCircle,
  Assignment,
  Subject,
  Download,
} from '@mui/icons-material';

export default function AiAssistantPage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Deploy backend JWT authentication hotfix to staging server', done: false },
    { id: 2, text: 'Update WebRTC peer connection fallback handlers for Safari', done: true },
    { id: 3, text: 'Review Q3 Enterprise security SLA documentation', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <AutoAwesome sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">AI Meeting Assistant</Typography>
            <Typography variant="body2" color="text.secondary">Automated meeting summaries, key decisions, action items, and live transcripts</Typography>
          </Box>
        </Box>
        <Button variant="outlined" startIcon={<Download />}>Export AI Report</Button>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Summary & Decisions */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            {/* Meeting Summary Card */}
            <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Subject color="primary" />
                  <Typography variant="h6" fontWeight="bold">Meeting Summary</Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" paragraph>
                  The team conducted the Q3 Enterprise Architecture Sync. Key discussions revolved around unifying the frontend context architecture, ensuring smooth WebRTC fallback for multi-party calls, and hardening JWT token interceptors.
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip label="Architecture" size="small" color="primary" variant="outlined" />
                  <Chip label="WebRTC" size="small" color="primary" variant="outlined" />
                  <Chip label="Auth Sync" size="small" color="primary" variant="outlined" />
                </Stack>
              </CardContent>
            </Card>

            {/* Key Decisions Card */}
            <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <CheckCircle color="success" />
                  <Typography variant="h6" fontWeight="bold">Key Decisions Made</Typography>
                </Stack>
                <List disablePadding>
                  <ListItem>
                    <ListItemIcon><CheckCircle fontSize="small" color="success" /></ListItemIcon>
                    <ListItemText primary="Standardize on single unified AuthContext for all parameters & hooks." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle fontSize="small" color="success" /></ListItemIcon>
                    <ListItemText primary="Preserve all native WebRTC audio/video and Socket.IO signaling event structures." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckCircle fontSize="small" color="success" /></ListItemIcon>
                    <ListItemText primary="Keep backend routes completely untouched while delivering clean frontend architecture." />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column - Action Items & Transcript */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            {/* Action Items Card */}
            <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Assignment color="primary" />
                  <Typography variant="h6" fontWeight="bold">Action Items</Typography>
                </Stack>
                <List disablePadding>
                  {tasks.map((task) => (
                    <ListItem key={task.id} button onClick={() => toggleTask(task.id)} disableGutters>
                      <ListItemIcon>
                        <Checkbox checked={task.done} size="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.text}
                        sx={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? 'text.disabled' : 'text.primary' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Transcript Preview Card */}
            <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={2}>Transcript Preview</Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', maxHeight: 200, overflowY: 'auto' }}>
                  <Typography variant="caption" color="text.secondary" display="block">00:01:15 - Alex Johnson</Typography>
                  <Typography variant="body2" mb={1.5}>"Let's make sure the WebRTC peer connection configuration includes Google STUN servers."</Typography>
                  <Typography variant="caption" color="text.secondary" display="block">00:02:40 - You</Typography>
                  <Typography variant="body2">"Agreed! I will update the media controls and Socket.IO signaling events."</Typography>
                </Paper>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
