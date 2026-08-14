import React from 'react';
import { Card, CardContent, Grid, Typography, Box, Chip, Avatar } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from './StatsCards.module.css';

const stats = [
  {
    title: "Today's Meetings",
    value: '8',
    icon: <AnalyticsIcon />,
    trend: '+12%',
    trendColor: 'success',
    color: 'primary.main',
  },
  {
    title: 'Upcoming Meetings',
    value: '12',
    icon: <CalendarMonthIcon />,
    trend: '+5',
    trendColor: 'info',
    color: 'success.main',
  },
  {
    title: 'Hours in Meetings',
    value: '24.5',
    icon: <AccessTimeIcon />,
    trend: '-3%',
    trendColor: 'error',
    color: 'warning.main',
  },
  {
    title: 'Team Members',
    value: '48',
    icon: <GroupsIcon />,
    trend: '+2',
    trendColor: 'success',
    color: 'secondary.main',
  },
];

const StatsCards = () => {
  return (
    <Box component="section" aria-labelledby="statistics-title">
      <Typography variant="h5" component="h2" id="statistics-title" gutterBottom sx={{ fontWeight: 'bold' }}>
        Statistics
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card className={styles.statCard} variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ pr: 1 }}>
                    {stat.title}
                  </Typography>
                  <Avatar sx={{ bgcolor: stat.color, width: 40, height: 40, color: 'white' }}>
                    {stat.icon}
                  </Avatar>
                </Box>
                <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', my: 1 }}>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip icon={<TrendingUpIcon />} label={stat.trend} color={stat.trendColor} size="small" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsCards;