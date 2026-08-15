import React from 'react';
import { Card, CardContent, Typography, Stack, IconButton, Tooltip, Chip, Avatar } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ImageIcon from '@mui/icons-material/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from './FileCard.module.css';

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf': return <PictureAsPdfIcon sx={{ color: '#D32F2F' }} />;
    case 'docx': return <DescriptionIcon sx={{ color: '#1976D2' }} />;
    case 'xlsx': return <DescriptionIcon sx={{ color: '#388E3C' }} />;
    case 'pptx': return <DescriptionIcon sx={{ color: '#F57C00' }} />;
    case 'zip': return <FolderZipIcon color="action" />;
    case 'jpg':
    case 'png': return <ImageIcon sx={{ color: '#7B1FA2' }} />;
    default: return <DescriptionIcon color="action" />;
  }
};

const FileCard = ({ file }) => {
  return (
    <Card variant="outlined" className={styles.fileCard}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Avatar variant="rounded" sx={{ bgcolor: 'action.hover' }}>
            {getFileIcon(file.name)}
          </Avatar>
          <IconButton size="small"><MoreVertIcon /></IconButton>
        </Stack>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2, noWrap: true }}>
          {file.name}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {file.size} • {file.lastModified}
        </Typography>

        <Stack direction="row" spacing={0.5} mt={1} className={styles.chipContainer}>
          {file.tags.map(tag => <Chip key={tag} label={tag} size="small" />)}
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
          <Tooltip title={`Owner: ${file.owner}`}>
            <Avatar alt={file.owner} src={file.ownerAvatar} sx={{ width: 24, height: 24 }} />
          </Tooltip>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Preview"><IconButton size="small"><VisibilityOutlinedIcon /></IconButton></Tooltip>
            <Tooltip title="Download"><IconButton size="small"><DownloadOutlinedIcon /></IconButton></Tooltip>
            <Tooltip title="Share"><IconButton size="small"><ShareOutlinedIcon /></IconButton></Tooltip>
            <Tooltip title="Delete"><IconButton size="small"><DeleteOutlineIcon /></IconButton></Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FileCard;