import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/ToastProvider';
import useApi from '../../hooks/useApi';
import { profileService } from '../../services/profile.service';
import { Card, CardContent, Typography, Grid, TextField, Avatar, Badge, IconButton, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Edit } from '@mui/icons-material';

const ProfileSettings = () => {
    const { user, setUser } = useAuth(); // Assuming setUser is exposed by AuthContext to update user state globally
    const { showToast } = useToast();
    const { request: updateProfile, loading } = useApi(profileService.updateMyProfile);
    const [formData, setFormData] = useState({ name: '', title: '' });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                title: user.title || 'Team Member', // Placeholder
            });
            setAvatarPreview(user.avatarUrl || null);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a preview URL
            setAvatarPreview(URL.createObjectURL(file));
            // In a real scenario, you'd also store the file object to be uploaded
            // setAvatarFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you would also handle the avatar file upload, likely as multipart/form-data
            const updatedUser = await updateProfile(formData);
            // Optimistically update the user in AuthContext
            setUser(prevUser => ({ ...prevUser, ...updatedUser }));
            showToast('Profile updated successfully!', 'success');
        } catch (error) {
            showToast(error.toString(), 'error');
        }
    };

    if (!user) {
        return null; // Or a loader
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>Profile Settings</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm="auto">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                                hidden
                            />
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <IconButton onClick={() => fileInputRef.current.click()} size="small" sx={{ bgcolor: 'background.paper' }}>
                                        <Edit fontSize="small" />
                                    </IconButton>
                                }
                            >
                                <Avatar src={avatarPreview} sx={{ width: 100, height: 100 }} />
                            </Badge>
                        </Grid>
                        <Grid item xs={12} sm>
                            <Stack spacing={2}>
                                <TextField
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Job Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Email Address"
                                    value={user.email}
                                    fullWidth
                                    disabled
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <LoadingButton type="submit" variant="contained" loading={loading}>Save Changes</LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileSettings;