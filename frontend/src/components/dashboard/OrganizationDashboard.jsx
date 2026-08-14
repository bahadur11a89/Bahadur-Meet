import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import OrganizationHeader from '../OrganizationHeader/OrganizationHeader';
import OrganizationOverview from '../OrganizationOverview/OrganizationOverview';
import TeamManagement from '../TeamManagement/TeamManagement';
import MemberManagement from '../MemberManagement/MemberManagement';
import styles from './OrganizationDashboard.module.css';

const OrganizationDashboard = () => {
    return (
        <Box className={styles.dashboardContainer} sx={{ bgcolor: 'background.default' }}>
            <OrganizationHeader />
            <OrganizationOverview />

            <Divider sx={{ my: 4 }}>
                <Typography variant="overline">Management</Typography>
            </Divider>

            <TeamManagement />

            <Divider sx={{ my: 4 }} />

            <MemberManagement />
        </Box>
    );
};

export default OrganizationDashboard;