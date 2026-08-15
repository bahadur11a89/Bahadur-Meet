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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  TableChart as TableChartIcon,
  Add,
  Delete,
  Save,
} from '@mui/icons-material';
import { sheetService } from '../services/sheet.service';

const INITIAL_GRID = [
  ['Category', 'Q1 Budget', 'Q2 Budget', 'Status'],
  ['Engineering', '$45,000', '$50,000', 'Approved'],
  ['Marketing', '$20,000', '$25,000', 'Pending'],
  ['Operations', '$15,000', '$18,000', 'Approved'],
];

export default function SheetsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSheet, setActiveSheet] = useState(null);
  const [grid, setGrid] = useState(INITIAL_GRID);

  // Dialog state
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState('');

  const fetchSheetDocs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await sheetService.getSheetDocs();
      const list = res.data?.sheetDocs || res.data?.data || res.sheetDocs || [];
      setDocs(Array.isArray(list) ? list : []);
      setActiveSheet((prevActive) => {
        if (list.length > 0 && !prevActive) {
          setGrid(Array.isArray(list[0].gridData) && list[0].gridData.length > 0 ? list[0].gridData : INITIAL_GRID);
          return list[0];
        }
        return prevActive;
      });
    } catch (err) {
      console.error('Failed to load sheet documents:', err);
      setError('Failed to load spreadsheet documents.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSheetDocs();
  }, [fetchSheetDocs]);

  const handleCreateSheet = async () => {
    if (!title.trim()) return;
    try {
      const res = await sheetService.createSheetDoc({ title: title.trim(), gridData: INITIAL_GRID });
      const created = res.data?.data || res.data || null;
      setTitle('');
      setOpenCreate(false);
      await fetchSheetDocs();
      if (created) {
        setActiveSheet(created);
        setGrid(INITIAL_GRID);
      }
    } catch (err) {
      console.error('Failed to create sheet:', err);
      setError('Failed to create spreadsheet document.');
    }
  };

  const handleDeleteSheet = async (id) => {
    try {
      await sheetService.deleteSheetDoc(id);
      if (activeSheet && (activeSheet._id === id || activeSheet.id === id)) {
        setActiveSheet(null);
      }
      fetchSheetDocs();
    } catch (err) {
      console.error('Failed to delete sheet:', err);
      setError('Failed to delete spreadsheet document.');
    }
  };

  const handleCellChange = (rIdx, cIdx, val) => {
    const nextGrid = grid.map((row, r) =>
      row.map((cell, c) => (r === rIdx && c === cIdx ? val : cell))
    );
    setGrid(nextGrid);
  };

  const handleSaveSheet = async () => {
    if (!activeSheet) return;
    try {
      await sheetService.updateSheetDoc(activeSheet._id || activeSheet.id, { gridData: grid });
      fetchSheetDocs();
    } catch (err) {
      console.error('Failed to save sheet:', err);
      setError('Failed to save spreadsheet data.');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <TableChartIcon sx={{ color: 'primary.main', fontSize: 36 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">Enterprise Sheets</Typography>
            <Typography variant="body2" color="text.secondary">Grid data analysis and spreadsheet tables</Typography>
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenCreate(true)}>
          New Sheet
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Left Column: Sheets List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Spreadsheets</Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : docs.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
              <Typography variant="body2" color="text.secondary">No spreadsheets created yet.</Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {docs.map((s) => (
                <Card
                  variant="outlined"
                  key={s._id || s.id}
                  sx={{
                    borderRadius: 3,
                    cursor: 'pointer',
                    borderColor: (activeSheet?._id === s._id || activeSheet?.id === s.id) ? 'primary.main' : 'divider',
                    bgcolor: (activeSheet?._id === s._id || activeSheet?.id === s.id) ? 'rgba(14, 114, 237, 0.04)' : 'background.paper',
                  }}
                  onClick={() => {
                    setActiveSheet(s);
                    setGrid(Array.isArray(s.gridData) && s.gridData.length > 0 ? s.gridData : INITIAL_GRID);
                  }}
                >
                  <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">{s.title}</Typography>
                      <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); handleDeleteSheet(s._id || s.id); }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Grid>

        {/* Right Column: Grid Table */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                {activeSheet ? activeSheet.title : 'Spreadsheet Grid'}
              </Typography>
              <Button variant="contained" size="small" startIcon={<Save />} onClick={handleSaveSheet} disabled={!activeSheet}>
                Save Sheet
              </Button>
            </Stack>
            <Table variant="outlined" sx={{ border: '1px solid #e2e8f0', borderRadius: 2 }}>
              <TableHead sx={{ bgcolor: 'grey.100' }}>
                <TableRow>
                  {grid[0] && grid[0].map((cell, cIdx) => (
                    <TableCell key={cIdx} fontWeight="bold" sx={{ borderRight: '1px solid #e2e8f0' }}>
                      <TextField
                        variant="standard"
                        value={cell}
                        onChange={(e) => handleCellChange(0, cIdx, e.target.value)}
                        InputProps={{ disableUnderline: true, style: { fontWeight: 'bold' } }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {grid.slice(1).map((row, rIdx) => (
                  <TableRow key={rIdx + 1}>
                    {row.map((cell, cIdx) => (
                      <TableCell key={cIdx} sx={{ borderRight: '1px solid #e2e8f0', p: 1 }}>
                        <TextField
                          variant="standard"
                          value={cell}
                          onChange={(e) => handleCellChange(rIdx + 1, cIdx, e.target.value)}
                          InputProps={{ disableUnderline: true }}
                          fullWidth
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {/* Create Sheet Dialog */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight="bold">Create New Spreadsheet</DialogTitle>
        <DialogContent dividers>
          <TextField label="Sheet Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 1 }} required />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateSheet} disabled={!title.trim()}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
