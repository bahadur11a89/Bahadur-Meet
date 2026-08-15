import React from 'react';
import { Card, CardContent, Typography, Stack, Avatar, Chip, Box, IconButton, Menu, MenuItem, Badge } from '@mui/material';
import { MoreVert, Person, Edit, Delete } from '@mui/icons-material';
import styles from './MemberCard.module.css';

const statusColors = {
    online: 'success',
    away: 'warning',
    offline: 'default',
};

const MemberCard = ({ member }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Card className={styles.memberCard}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            color={statusColors[member.status]}
                            sx={{
                                '& .MuiBadge-dot': {
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                },
                            }}
                        >
                            <Avatar src={member.avatar} alt={member.name} sx={{ width: 56, height: 56 }} />
                        </Badge>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{member.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{member.email}</Typography>
                        </Box>
                    </Stack>
                    <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreVert />
                    </IconButton>
                </Stack>
                <Stack direction="row" spacing={1} mt={2} alignItems="center">
                    <Chip label={member.role} color="primary" variant="outlined" size="small" />
                    <Chip label={member.department} variant="outlined" size="small" />
                </Stack>
            </CardContent>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Person fontSize="small" sx={{ mr: 1 }} /> View Profile</MenuItem>
                <MenuItem onClick={handleClose}><Edit fontSize="small" sx={{ mr: 1 }} /> Change Role</MenuItem>
                <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}><Delete fontSize="small" sx={{ mr: 1 }} /> Remove Member</MenuItem>
            </Menu>
        </Card>
    );
};

export default React.memo(MemberCard);