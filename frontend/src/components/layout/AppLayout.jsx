import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import MeetingLayout from '../meeting/MeetingLayout';

const AppLayout = () => {
    const location = useLocation();

    // Example of conditional layout rendering
    if (location.pathname.startsWith('/meet/')) {
        return <MeetingLayout />;
    }

    // Default to DashboardLayout
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
};

export default AppLayout;