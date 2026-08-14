import React, { useRef, useEffect } from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';
import { VideocamOff } from '@mui/icons-material';
import { useLocalMedia } from '../../../hooks/useLocalMedia';

const LocalVideoPreview = ({ mirror = true }) => {
    const videoRef = useRef(null);
    const { localStream, isLoading, mediaError } = useLocalMedia();

    useEffect(() => {
        if (videoRef.current && localStream) {
            videoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    const renderContent = () => {
        if (isLoading) {
            return <CircularProgress />;
        }
        if (mediaError) {
            return <Typography color="error">Error: {mediaError.name}</Typography>;
        }
        if (!localStream) {
            return (
                <>
                    <VideocamOff sx={{ fontSize: 60, color: 'text.secondary' }} />
                    <Typography color="text.secondary">Camera is off</Typography>
                </>
            );
        }
        return null; // Video will be shown
    };

    return (
        <Paper variant="outlined" sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', bgcolor: 'common.black', borderRadius: 3, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: mirror ? 'scaleX(-1)' : 'none',
                    display: localStream ? 'block' : 'none',
                }}
            />
            <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                {renderContent()}
            </Box>
        </Paper>
    );
};

export default LocalVideoPreview;