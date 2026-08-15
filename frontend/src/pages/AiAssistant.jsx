import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
  Paper,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import {
  AutoAwesome,
  CheckCircle,
  Assignment,
  Subject,
  Download,
  PlayArrow,
} from '@mui/icons-material';
import { meetingService } from '../services/meeting.service';

export default function AiAssistantPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = useState('');
  const [aiData, setAiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await meetingService.getAllMeetings();
        const list = res.data?.meetings || res.data || res.meetings || [];
        setMeetings(Array.isArray(list) ? list : []);
        if (list.length > 0) {
          const firstId = list[0]._id || list[0].meetingCode;
          setSelectedMeetingId(firstId);
        } else {
          setAiData({ unconfigured: true, message: 'No meetings found for AI analysis.' });
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load meetings:', err);
        setError('Failed to load meeting list.');
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    if (!selectedMeetingId) return;

    const fetchAiData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await meetingService.getMeetingAi(selectedMeetingId);
        setAiData(res.data?.data || res.data || null);
      } catch (err) {
        console.error('Failed to load AI data:', err);
        setError('Failed to load AI meeting analysis from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchAiData();
  }, [selectedMeetingId]);

  const handleGenerateAi = async () => {
    if (!selectedMeetingId) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await meetingService.generateMeetingAi(selectedMeetingId);
      setAiData(res.data?.data || res.data || null);
    } catch (err) {
      console.error('Failed to generate AI:', err);
      setError(err.response?.data?.message || 'Failed to trigger AI generation.');
    } finally {
      setGenerating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'PROCESSING': return 'warning';
      case 'FAILED': return 'error';
      case 'NOT_CONFIGURED': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <AutoAwesome sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">AI Meeting Assistant</Typography>
            <Typography variant="body2" color="text.secondary">Automated meeting summaries, key decisions, action items, and live transcripts</Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          {meetings.length > 0 && (
            <FormControl size="small" sx={{ minWidth: 220 }}>
              <InputLabel>Select Meeting</InputLabel>
              <Select
                value={selectedMeetingId}
                label="Select Meeting"
                onChange={(e) => setSelectedMeetingId(e.target.value)}
              >
                {meetings.map((m) => (
                  <MenuItem key={m._id || m.meetingCode} value={m._id || m.meetingCode}>
                    {m.title || m.meetingCode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            variant="contained"
            startIcon={generating ? <CircularProgress size={18} color="inherit" /> : <PlayArrow />}
            onClick={handleGenerateAi}
            disabled={generating || !selectedMeetingId}
          >
            {generating ? 'Processing AI...' : 'Generate AI Summary'}
          </Button>
          <Button variant="outlined" startIcon={<Download />} disabled={!aiData || aiData.unconfigured}>Export Report</Button>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>}

      {aiData?.unconfigured && (
        <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
          {aiData.message || 'AI Assistant service is currently unconfigured on the backend. No meeting transcripts or automated summaries are available.'}
        </Alert>
      )}

      {loading ? (
        <Box textAlign="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Left Column - Summary & Decisions */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              {/* Meeting Summary Card */}
              <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Subject color="primary" />
                      <Typography variant="h6" fontWeight="bold">Meeting Summary</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip label={aiData?.status || 'COMPLETED'} size="small" color={getStatusColor(aiData?.status)} />
                      {aiData?.generatedAt && (
                        <Typography variant="caption" color="text.secondary">
                          {new Date(aiData.generatedAt).toLocaleTimeString()}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                  <Typography variant="body1" color="text.secondary">
                    {aiData?.summary || 'AI Summary Unavailable — Click "Generate AI Summary" above.'}
                  </Typography>
                </CardContent>
              </Card>

              {/* Key Decisions Card */}
              <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <CheckCircle color="success" />
                    <Typography variant="h6" fontWeight="bold">Key Decisions Made</Typography>
                  </Stack>
                  {aiData?.keyDecisions && aiData.keyDecisions.length > 0 ? (
                    <List disablePadding>
                      {aiData.keyDecisions.map((dec, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon><CheckCircle fontSize="small" color="success" /></ListItemIcon>
                          <ListItemText primary={dec} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No AI key decisions recorded for this session.
                    </Typography>
                  )}
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
                  {aiData?.actionItems && aiData.actionItems.length > 0 ? (
                    <List disablePadding>
                      {aiData.actionItems.map((item, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon><Assignment fontSize="small" color="primary" /></ListItemIcon>
                          <ListItemText primary={typeof item === 'string' ? item : item.text} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No action items assigned.
                    </Typography>
                  )}
                </CardContent>
              </Card>

              {/* Transcript Preview Card */}
              <Card variant="outlined" sx={{ borderRadius: 3, p: 1 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" mb={2}>Transcript Preview</Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50', textAlign: aiData?.transcript?.length ? 'left' : 'center' }}>
                    {aiData?.transcript && aiData.transcript.length > 0 ? (
                      aiData.transcript.map((line, idx) => (
                        <Box key={idx} mb={1}>
                          <Typography variant="caption" color="text.secondary" display="block">{line.timestamp || ''} - {line.sender || 'Speaker'}</Typography>
                          <Typography variant="body2">{line.text}</Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No transcript data available.
                      </Typography>
                    )}
                  </Paper>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
