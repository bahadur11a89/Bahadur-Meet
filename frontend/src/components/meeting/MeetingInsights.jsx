import React from 'react';
import { Box, Typography, Stack, Card, CardContent, Grid } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import styles from './MeetingInsights.module.css';

const insights = [
  { title: 'Speaking Time', value: 'Alice: 45%, Bob: 25%' },
  { title: 'Participation', value: '8/9 participants spoke' },
  { title: 'Engagement', value: '12 reactions, 4 Q&A' },
  { title: 'Attendance', value: '95% attended on time' },
];

const MeetingInsights = () => {
  return (
    <Stack className={styles.panelContainer}>
      <Box className={styles.panelHeader}>
        <BarChartIcon />
        <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1 }}>
          Insights
        </Typography>
      </Box>
      <Box className={styles.listContainer}>
        <Grid container spacing={2}>
          {insights.map((insight, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined" className={styles.insightCard}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">{insight.title}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{insight.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Card variant="outlined" className={styles.insightCard}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">Speaking Timeline</Typography>
                <Box sx={{ height: 100, bgcolor: '#444', borderRadius: 1, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="caption">[Chart Placeholder]</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default MeetingInsights;