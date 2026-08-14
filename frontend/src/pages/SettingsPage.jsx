import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';

// Lazy load setting sections for better performance
const SecurityDashboard = React.lazy(() => import('../components/settings/SecurityDashboard'));
const AudioSettings = React.lazy(() => import('../components/settings/AudioSettings'));
const VideoSettings = React.lazy(() => import('../components/settings/VideoSettings'));
const ProfileSettings = React.lazy(() => import('../components/settings/ProfileSettings'));

const settingsTabs = [
    { label: 'Profile', value: '/settings/profile' },
    { label: 'Security', value: '/settings/security' },
    { label: 'Audio', value: '/settings/audio' },
    { label: 'Video', value: '/settings/video' },
];

const SettingsPage = () => {
    const location = useLocation();

    // Find the current tab, default to the first one if no match
    const currentTab = settingsTabs.find(tab => location.pathname.startsWith(tab.value))?.value || settingsTabs[0].value;

    return (
        <Box>
            <Tabs value={currentTab} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                {settingsTabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} component={Link} to={tab.value} />
                ))}
            </Tabs>
            <Routes>
                <Route path="/" element={<Navigate to="/settings/profile" replace />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="security" element={<SecurityDashboard />} />
                <Route path="audio" element={<AudioSettings />} />
                <Route path="video" element={<VideoSettings />} />
                {/* Add other setting routes here */}
            </Routes>
        </Box>
    );
};

export default SettingsPage;