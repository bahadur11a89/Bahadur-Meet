import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const history = await getHistoryOfUser();
        const rawArr = Array.isArray(history) ? history : (history?.meetings || history?.data?.meetings || []);
        setMeetings(Array.isArray(rawArr) ? rawArr : []);
      } catch (err) {
        console.error('Failed to fetch user meeting history:', err);
        setError('Failed to fetch meeting history.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => routeTo('/dashboard')} color="primary">
          <HomeIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          Meeting History
        </Typography>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Box textAlign="center" py={6}>
          <CircularProgress />
        </Box>
      ) : meetings.length === 0 ? (
        <Box textAlign="center" py={6} sx={{ bgcolor: 'grey.50', borderRadius: 3, border: '1px dashed #cbd5e1' }}>
          <Typography variant="h6" color="text.secondary" fontWeight="600">
            No Meeting History Found
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Your past meeting activities will appear here.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {meetings.map((e, i) => (
            <Card key={e._id || i} variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {e.title || `Meeting: ${e.meetingCode}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Meeting Code: <strong>{e.meetingCode}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                  Date: {formatDate(e.date || e.createdAt || e.startedAt)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
