import React from 'react';
import { useNavigate } from 'react-router-dom';
import StateDisplay from './StateDisplay';
import { ErrorOutline, WifiOff, ReportProblemOutlined } from '@mui/icons-material';

const errorTypes = {
    404: {
        icon: <ErrorOutline />,
        title: 'Page Not Found',
        description: "Sorry, we couldn't find the page you're looking for.",
    },
    500: {
        icon: <ReportProblemOutlined />,
        title: 'Server Error',
        description: 'Something went wrong on our end. Please try again later.',
    },
    offline: {
        icon: <WifiOff />,
        title: 'You are offline',
        description: 'Please check your internet connection and try again.',
    },
    generic: {
        icon: <ErrorOutline />,
        title: 'Something went wrong',
        description: 'An unexpected error occurred. Please try again.',
    },
};

const ErrorState = ({ type = 'generic', onRetry }) => {
    const navigate = useNavigate();
    const config = errorTypes[type] || errorTypes.generic;

    const primaryAction = onRetry ? { text: 'Retry', onClick: onRetry } : { text: 'Go to Dashboard', onClick: () => navigate('/dashboard') };

    return (
        <StateDisplay
            icon={config.icon}
            title={config.title}
            description={config.description}
            primaryAction={primaryAction}
        />
    );
};

export default ErrorState;