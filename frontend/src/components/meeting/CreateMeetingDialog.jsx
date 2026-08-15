import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useMeetings } from '../../context/MeetingContext';

const CreateMeetingDialog = ({ open, onClose }) => {
    const { createNewMeeting, creatingMeeting } = useMeetings();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        isPrivate: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await createNewMeeting(formData);
            onClose();
            setFormData({ title: '', description: '', startTime: '', endTime: '', isPrivate: false }); // Reset form
        } catch (error) {
            // Error handled by useMeetings context and toast
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Schedule New Meeting</DialogTitle>
            <DialogContent>
                <Stack spacing={3} pt={1}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Meeting Title"
                        type="text"
                        fullWidth
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="startTime"
                        label="Start Time"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.startTime}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="endTime"
                        label="End Time"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.endTime}
                        onChange={handleChange}
                    />
                    <FormControlLabel control={<Checkbox name="isPrivate" checked={formData.isPrivate} onChange={handleChange} />} label="Private Meeting" />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <LoadingButton onClick={handleSubmit} variant="contained" loading={creatingMeeting}>
                    Schedule Meeting
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default CreateMeetingDialog;