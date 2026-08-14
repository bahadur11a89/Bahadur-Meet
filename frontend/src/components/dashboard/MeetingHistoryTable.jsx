import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Tooltip, Chip, TablePagination, Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './MeetingHistoryTable.module.css';

const columns = [
  { id: 'name', label: 'Meeting Name' },
  { id: 'id', label: 'Meeting ID' },
  { id: 'host', label: 'Host' },
  { id: 'participants', label: 'Participants', align: 'center' },
  { id: 'startTime', label: 'Start Time' },
  { id: 'duration', label: 'Duration' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

const statusColors = { Completed: 'success', Scheduled: 'info', Cancelled: 'warning', Live: 'error' };

const MeetingHistoryTable = ({ meetings, onViewDetails }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="meeting history table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map((row) => (
              <TableRow hover role="button" tabIndex={-1} key={row.id} className={styles.tableRow} onClick={() => onViewDetails(row)}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.host}</TableCell>
                <TableCell align="center">{row.participants}</TableCell>
                <TableCell>{row.startTime}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={statusColors[row.status]} size="small" />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details"><IconButton size="small" onClick={() => onViewDetails(row)}><VisibilityIcon /></IconButton></Tooltip>
                  <Tooltip title="Download Recording"><IconButton size="small"><DownloadIcon /></IconButton></Tooltip>
                  <Tooltip title="Share"><IconButton size="small"><ShareIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton size="small"><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={meetings.length}
        rowsPerPage={10}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
};

export default MeetingHistoryTable;