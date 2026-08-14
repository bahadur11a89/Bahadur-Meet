import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    TextField,
    Button,
    Stack,
    Box,
    LinearProgress,
    Typography,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './PasswordSettings.module.css';

const PasswordSettings = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const getPasswordStrength = (password) => {
        if (password.length < 6) return { value: 25, color: 'error', label: 'Weak' };
        if (password.length < 10) return { value: 50, color: 'warning', label: 'Medium' };
        if (/\d/.test(password) && /[a-zA-Z]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
            return { value: 100, color: 'success', label: 'Strong' };
        }
        return { value: 75, color: 'success', label: 'Good' };
    };

    const strength = getPasswordStrength(newPassword);

    const togglePasswordVisibility = (setter) => {
        setter(prev => !prev);
    };

    return (
        <Box className={styles.container}>
            <Card className={styles.card}>
                <CardHeader title="Change Your Password" subheader="Update your password for enhanced security." />
                <CardContent>
                    <Stack spacing={3}>
                        <TextField
                            label="Current Password"
                            type={showCurrentPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => togglePasswordVisibility(setShowCurrentPassword)} edge="end">
                                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="New Password"
                            type={showNewPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => togglePasswordVisibility(setShowNewPassword)} edge="end">
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {newPassword && (
                            <Box>
                                <LinearProgress variant="determinate" value={strength.value} color={strength.color} />
                                <Typography variant="caption" color={strength.color + '.main'}>Strength: {strength.label}</Typography>
                            </Box>
                        )}
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="text" color="secondary">Cancel</Button>
                            <Button variant="contained" color="primary" disabled={strength.value < 50}>
                                Change Password
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default React.memo(PasswordSettings);