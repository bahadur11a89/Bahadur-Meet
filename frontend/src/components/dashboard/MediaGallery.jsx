import React, { useState } from 'react';
import { Box, Typography, Grid, Tabs, Tab, Card, CardMedia } from '@mui/material';
import ImagePreviewDialog from '../ImagePreviewDialog/ImagePreviewDialog';
import styles from './MediaGallery.module.css';

const mediaItems = [
  { type: 'image', src: '/static/images/placeholder/img1.jpg' },
  { type: 'video', src: '/static/images/placeholder/vid1.jpg' },
  { type: 'image', src: '/static/images/placeholder/img2.jpg' },
  { type: 'audio', src: '/static/images/placeholder/aud1.jpg' },
  { type: 'screenshot', src: '/static/images/placeholder/ss1.jpg' },
  { type: 'whiteboard', src: '/static/images/placeholder/wb1.jpg' },
];

const MediaGallery = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);
  const handlePreviewOpen = () => setPreviewOpen(true);
  const handlePreviewClose = () => setPreviewOpen(false);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>Media Gallery</Typography>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="All" />
          <Tab label="Images" />
          <Tab label="Videos" />
          <Tab label="Audio" />
          <Tab label="Screenshots" />
        </Tabs>
        <Grid container spacing={2}>
          {mediaItems.map((item, index) => (
            <Grid item key={index} xs={6} sm={4} md={3}>
              <Card className={styles.mediaCard} onClick={handlePreviewOpen}>
                <CardMedia component="img" height="160" image={item.src} alt={`Media item ${index + 1}`} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <ImagePreviewDialog open={previewOpen} onClose={handlePreviewClose} />
    </>
  );
};

export default MediaGallery;