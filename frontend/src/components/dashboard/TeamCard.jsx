import React from 'react';
import { Card, CardContent, Typography, Stack, Avatar, Button, Chip, Box, Tooltip } from '@mui/material';
import { Engineering, Storefront, Brush, People, Person } from '@mui/icons-material';
import styles from './TeamCard.module.css';

const teamIcons = {
    Engineering: <Engineering />,
    Product: <Storefront />,
    Design: <Brush />,
    default: <People />,
};

const TeamCard = ({ team }) => {
    return (
        <Card className={styles.teamCard}>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar variant="rounded" sx={{ bgcolor: 'secondary.light', color: 'secondary.dark' }}>
                                {teamIcons[team.name] || teamIcons.default}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{team.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{team.description}</Typography>
                            </Box>
                        </Stack>
                        <Chip label={`${team.members} members`} size="small" />
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Person fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            Lead: <strong>{team.lead}</strong>
                        </Typography>
                    </Stack>

                    <Box>
                        <Typography variant="caption" color="text.secondary">Active Projects: {team.activeProjects}</Typography>
                    </Box>

                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" variant="text">Edit</Button>
                        <Button size="small" variant="contained">Open Team</Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default React.memo(TeamCard);