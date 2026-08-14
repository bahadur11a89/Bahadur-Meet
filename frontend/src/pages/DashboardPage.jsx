import React, { useEffect } from 'react';
import useApi from '../hooks/useApi';
import { dashboardService } from '../services/dashboard.service';
import OrganizationOverview from '../components/organization/OrganizationOverview/OrganizationOverview';
import DashboardSkeleton from '../components/common/skeletons/DashboardSkeleton';
import ErrorState from '../components/common/states/ErrorState';

const DashboardPage = () => {
    const { data, error, loading, request: fetchSummary } = useApi(dashboardService.getSummary);

    useEffect(() => {
        // This is a placeholder call. In a real app, the service would hit a live endpoint.
        // To simulate, we'll resolve it after a delay in a mock service if needed.
        // For now, we expect it to fail gracefully as there's no backend.
        fetchSummary().catch(err => console.log("Dashboard fetch failed as expected."));
    }, [fetchSummary]);

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return <ErrorState onRetry={fetchSummary} />;
    }

    // If data was successfully fetched, you would pass it to the components.
    // For now, we fall back to the component with its static data.
    return <OrganizationOverview data={data} />;
};

export default DashboardPage;