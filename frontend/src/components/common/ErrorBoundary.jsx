import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box className={styles.container}>
                    <Paper className={styles.paper}>
                        <ErrorOutline color="error" sx={{ fontSize: 60 }} />
                        <Typography variant="h4" gutterBottom>
                            Something went wrong.
                        </Typography>
                        <Typography color="text.secondary">
                            We've logged the error and will look into it. Please refresh the page to continue.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => window.location.reload()}
                            sx={{ mt: 3 }}
                        >
                            Refresh Page
                        </Button>
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;