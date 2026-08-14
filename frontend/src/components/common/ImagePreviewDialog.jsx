import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const ImagePreviewDialog = ({ open, onClose }) => {
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            header_logo.png
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
        <IconButton sx={{ position: 'absolute', left: 16, color: 'white' }}><ArrowBackIosNewIcon /></IconButton>
        <Box
          component="img"
          src="/static/images/placeholder/img1.jpg"
          alt="Preview"
          sx={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }}
        />
        <IconButton sx={{ position: 'absolute', right: 16, color: 'white' }}><ArrowForwardIosIcon /></IconButton>
      </DialogContent>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, bgcolor: 'rgba(0,0,0,0.5)' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <IconButton color="inherit"><ZoomInIcon /></IconButton>
          <IconButton color="inherit"><ZoomOutIcon /></IconButton>
          <IconButton color="inherit"><RotateLeftIcon /></IconButton>
          <IconButton color="inherit"><FullscreenIcon /></IconButton>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};

export default ImagePreviewDialog;