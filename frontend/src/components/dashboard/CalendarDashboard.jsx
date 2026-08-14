import React, { useState } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import CalendarSidebar from '../CalendarSidebar/CalendarSidebar';
import MonthCalendar from '../MonthCalendar/MonthCalendar';
import WeekCalendar from '../WeekCalendar/WeekCalendar';
import DayCalendar from '../DayCalendar/DayCalendar';
import MeetingScheduler from '../MeetingScheduler/MeetingScheduler';
import styles from './CalendarDashboard.module.css';

const sidebarWidth = 280;

const CalendarDashboard = () => {
  const [view, setView] = useState('month');
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleViewChange = (event, newView) => {
    if (newView !== null) setView(newView);
  };

  const renderCalendarView = () => {
    switch (view) {
      case 'week': return <WeekCalendar />;
      case 'day': return <DayCalendar />;
      default: return <MonthCalendar />;
    }
  };

  return (
    <>
      <Box className={styles.dashboardContainer}>
        <Drawer
          variant={isDesktop ? 'permanent' : 'temporary'}
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: sidebarWidth, boxSizing: 'border-box', position: 'relative', borderRight: 'none' },
          }}
        >
          <CalendarSidebar onScheduleClick={() => setSchedulerOpen(true)} />
        </Drawer>
        <Box component="main" className={styles.mainContent}>
          <CalendarHeader view={view} onViewChange={handleViewChange} />
          <Box className={styles.calendarWrapper}>
            {renderCalendarView()}
          </Box>
        </Box>
      </Box>
      <MeetingScheduler open={schedulerOpen} onClose={() => setSchedulerOpen(false)} />
    </>
  );
};

export default CalendarDashboard;