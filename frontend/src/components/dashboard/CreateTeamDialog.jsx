import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete
} from '@mui/material';

const members = [
    { name: 'John Doe', role: 'Engineer' },
    { name: 'Jane Smith', role: 'Designer' },
    { name: 'Peter Jones', role: 'Product Manager' },
];

const CreateTeamDialog = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4 } }}>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Create a New Team</DialogTitle>
            <DialogContent>
                <Stack spacing={3} pt={1}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Team Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select labelId="department-label" label="Department">
                            <MenuItem value="engineering">Engineering</MenuItem>
                            <MenuItem value="product">Product</MenuItem>
                            <MenuItem value="design">Design</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="lead-label">Team Lead</InputLabel>
                        <Select labelId="lead-label" label="Team Lead">
                            <MenuItem value="john-doe">John Doe</MenuItem>
                            <MenuItem value="jane-smith">Jane Smith</MenuItem>
                        </Select>
                    </FormControl>
                    <Autocomplete
                        multiple
                        options={members.map(m => m.name)}
                        renderInput={(params) => <TextField {...params} label="Add Members" placeholder="Select members..." />}
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} variant="contained">Create Team</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTeamDialog;