import React from 'react';
import { Grid } from '@mui/material';
import VideoTile from '../VideoTile/VideoTile';
import styles from './VideoGrid.module.css';

const demoParticipants = [
  { name: 'Alice Johnson', isHost: true, isMuted: false, isCameraOff: false, isSpeaking: true },
  { name: 'Bob Williams', isHost: false, isMuted: true, isCameraOff: false, isSpeaking: false },
  { name: 'Charlie Brown', isHost: false, isMuted: false, isCameraOff: true, isSpeaking: false },
  { name: 'David Chen', isHost: false, isMuted: false, isCameraOff: false, isSpeaking: false },
  { name: 'Eve Davis', isHost: false, isMuted: true, isCameraOff: true, isSpeaking: false },
  { name: 'Frank Miller', isHost: false, isMuted: false, isCameraOff: false, isSpeaking: false },
  { name: 'Grace Wilson', isHost: false, isMuted: false, isCameraOff: false, isSpeaking: false },
  { name: 'Heidi Taylor', isHost: false, isMuted: false, isCameraOff: false, isSpeaking: false },
  { name: 'You', isHost: false, isMuted: false, isCameraOff: false, isSpeaking: false },
];

const getGridSizes = (count) => {
  if (count <= 1) return { xs: 12, sm: 12, md: 12, lg: 12 };
  if (count <= 2) return { xs: 12, sm: 12, md: 6, lg: 6 };
  if (count <= 4) return { xs: 12, sm: 6, md: 6, lg: 6 };
  if (count <= 9) return { xs: 12, sm: 6, md: 4, lg: 4 };
  return { xs: 12, sm: 6, md: 4, lg: 3 }; // For 10-16 participants
};

const VideoGrid = () => {
  const participantCount = demoParticipants.length;
  const gridSizes = getGridSizes(participantCount);

  return (
    <Grid container spacing={2} className={styles.videoGrid} alignContent="center" alignItems="center" justifyContent="center">
      {demoParticipants.map((participant, index) => (
        <Grid item {...gridSizes} key={index} className={styles.gridItem}>
          <VideoTile participant={participant} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoGrid;