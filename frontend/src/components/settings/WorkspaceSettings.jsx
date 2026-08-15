import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    FormControlLabel,
    Switch,
    Divider,
    Select,
    MenuItem,
    FormControl,
    TextField
} from '@mui/material';
import styles from './WorkspaceSettings.module.css';

const settingsOptions = [
    { id: 'guestAccess', label: 'Allow Guest Access', control: <Switch defaultChecked /> },
    { id: 'fileSharing', label: 'Enable File Sharing', control: <Switch defaultChecked /> },
];

const WorkspaceSettings = () => {
    const [recordingPolicy, setRecordingPolicy] = React.useState('admin_only');

    return (
        <Box sx={{ p: 3, mt: 4, backgroundColor: '#fff', borderRadius: 4 }}>
            <Card elevation={0}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Workspace Settings
                    </Typography>
                    <Stack divider={<Divider />} spacing={2}>
                        <TextField
                            label="Workspace Name"
                            defaultValue="Innovate Corp"
                            variant="outlined"
                            fullWidth
                            sx={{ pt: 1 }}
                        />

                        {settingsOptions.map(opt => (
                            <FormControlLabel
                                key={opt.id}
                                control={opt.control}
                                label={<Typography variant="body1">{opt.label}</Typography>}
                                className={styles.formControlLabel}
                            />
                        ))}

                        <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                            <Typography variant="body1">Meeting Recording Policy</Typography>
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <Select
                                    value={recordingPolicy}
                                    onChange={(e) => setRecordingPolicy(e.target.value)}
                                >
                                    <MenuItem value="admin_only">Admins Only</MenuItem>
                                    <MenuItem value="all_members">All Members</MenuItem>
                                    <MenuItem value="disabled">Disabled</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>

                        <FormControlLabel
                            control={<Switch />}
                            label="Enforce Member Permissions"
                            className={styles.formControlLabel}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
};

export default React.memo(WorkspaceSettings);