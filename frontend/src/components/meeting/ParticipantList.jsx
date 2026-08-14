import React, { useState } from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { useParticipants } from '../../hooks/useParticipants';
import { useAuth } from '../../context/AuthContext';
import ParticipantCard from './ParticipantCard';
import DeleteDialog from '../common/dialogs/DeleteDialog';

const ParticipantList = () => {
    const { user } = useAuth();
    const {
        participants,
        participantCount,
        isHost,
        hostId,
        removeParticipant,
        transferHost,
    } = useParticipants();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const handleRemoveClick = (participantId) => {
        const participant = participants.find(p => p.id === participantId);
        setSelectedParticipant(participant);
        setDialogOpen(true);
    };

    const handleConfirmRemove = () => {
        if (selectedParticipant) {
            removeParticipant(selectedParticipant.id);
        }
        setDialogOpen(false);
        setSelectedParticipant(null);
    };

    return (
        <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Participants ({participantCount})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1.5} sx={{ overflowY: 'auto', flexGrow: 1 }}>
                {participants.map((p) => (
                    <ParticipantCard
                        key={p.id}
                        participant={p}
                        isCurrentUser={p.id === user?.id}
                        isHost={isHost}
                        isThisParticipantHost={p.id === hostId}
                        onRemove={handleRemoveClick}
                        onTransferHost={transferHost}
                    />
                ))}
            </Stack>
            <DeleteDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirmRemove}
                title="Remove Participant"
                description={`Are you sure you want to remove ${selectedParticipant?.name} from the meeting?`}
            />
        </Box>
    );
};

export default ParticipantList;