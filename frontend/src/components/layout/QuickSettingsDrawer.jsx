import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Slider,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThemeToggle from './ThemeToggle';

const QuickSettingsDrawer = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Settings</Typography>
          <IconButton onClick={onClose} aria-label="Close settings"><CloseIcon /></IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={4}>
          {/* Appearance Section */}
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1 }}>Appearance</FormLabel>
            <ThemeToggle />
          </FormControl>

          {/* Notifications Section */}
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 500 }}>Notifications</FormLabel>
            <FormControlLabel control={<Switch defaultChecked />} label="Enable Desktop Notifications" />
            <FormControlLabel control={<Switch />} label="Play sound for notifications" />
          </FormControl>

          {/* Language Section */}
          <FormControl fullWidth>
            <FormLabel component="legend" sx={{ fontWeight: 500, mb: 1 }}>Language</FormLabel>
            <Select defaultValue="en" labelId="language-select-label">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
            </Select>
          </FormControl>

          {/* Audio/Video Section */}
          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 500 }}>Audio & Video</Typography>
            <Box>
              <Typography gutterBottom variant="body2">Microphone Volume</Typography>
              <Slider defaultValue={70} aria-label="Microphone volume" />
            </Box>
            <Box>
              <Typography gutterBottom variant="body2">Speaker Volume</Typography>
              <Slider defaultValue={85} aria-label="Speaker volume" />
            </Box>
            <FormControlLabel control={<Switch />} label="Enable HD Video" />
          </Stack>

          {/* Meeting Preferences Section */}
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontWeight: 500 }}>Meeting Preferences</FormLabel>
            <RadioGroup defaultValue="gallery">
              <FormControlLabel value="gallery" control={<Radio />} label="Gallery View" />
              <FormControlLabel value="speaker" control={<Radio />} label="Speaker View" />
            </RadioGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="Mute microphone on join" />
            <FormControlLabel control={<Switch />} label="Turn off video on join" />
          </FormControl>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default QuickSettingsDrawer;