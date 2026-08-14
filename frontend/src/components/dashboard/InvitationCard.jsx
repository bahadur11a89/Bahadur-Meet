import React from 'react';
import { Paper, Typography, Stack, Chip, Button, Box } from '@mui/material';
import { Mail, Refresh, Cancel } from '@mui/icons-material';
import styles from './InvitationCard.module.css';

const statusConfig = {
    Pending: { color: 'warning', variant: 'outlined' },
    Accepted: { color: 'success', variant: 'filled' },
    Expired: { color: 'default', variant: 'outlined' },
};

const InvitationCard = ({ invitation }) => {
    const { color, variant } = statusConfig[invitation.status];

    return (
        <Paper variant="outlined" className={styles.invitationCard}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                    <Mail color="action" />
                    <Box>
                        <Typography sx={{ fontWeight: 'medium' }}>{invitation.email}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Invited as <strong>{invitation.role}</strong> to <strong>{invitation.team}</strong> on {invitation.date}
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Chip label={invitation.status} color={color} variant={variant} size="small" />
                    {invitation.status === 'Pending' && (
                        <>
                            <Button size="small" variant="text" startIcon={<Refresh />}>Resend</Button>
                            <Button size="small" color="error" startIcon={<Cancel />}>Cancel</Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default React.memo(InvitationCard);