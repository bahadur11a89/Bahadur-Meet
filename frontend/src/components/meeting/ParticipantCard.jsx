import React, { useState } from 'react';
import { Paper, Stack, Avatar, Typography, Box, Chip, IconButton, Menu } from '@mui/material';
import { MoreVert, Star } from '@mui/icons-material';
import ParticipantStatus from './ParticipantStatus';
import HostControls from './HostControls';

const ParticipantCard = ({
    participant,
    isCurrentUser,
    isHost,
    isThisParticipantHost,
    onRemove,
    onTransferHost,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = (participantId) => {
        onRemove(participantId);
        handleMenuClose();
    };

    const handleTransferHost = (participantId) => {
        onTransferHost(participantId);
        handleMenuClose();
    };

    return (
        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={participant.avatarUrl}>{participant.name.charAt(0)}</Avatar>
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle1" fontWeight="bold">{participant.name}</Typography>
                            {isThisParticipantHost && <Chip icon={<Star />} label="Host" size="small" color="primary" variant="outlined" />}
                            {isCurrentUser && <Chip label="You" size="small" />}
                        </Stack>
                        <ParticipantStatus isMuted={participant.isMuted} isCameraOff={participant.isCameraOff} />
                    </Box>
                </Stack>

                {isHost && !isCurrentUser && (
                    <IconButton size="small" onClick={handleMenuOpen}>
                        <MoreVert />
                    </IconButton>
                )}
            </Stack>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <HostControls
                    participantId={participant.id}
                    onRemove={handleRemove}
                    onTransferHost={handleTransferHost}
                />
            </Menu>
        </Paper>
    );
};

export default React.memo(ParticipantCard);