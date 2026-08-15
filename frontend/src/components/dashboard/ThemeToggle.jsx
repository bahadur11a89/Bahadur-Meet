import React from 'react';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useThemeManager } from '../../../app/AppThemeProvider';

const themeOptions = [
    {
        value: 'light',
        label: 'Light Mode',
        icon: <LightModeIcon fontSize="small" />,
    },
    {
        value: 'system',
        label: 'System Default',
        icon: <SettingsBrightnessIcon fontSize="small" />,
    },
    {
        value: 'dark',
        label: 'Dark Mode',
        icon: <DarkModeIcon fontSize="small" />,
    },
];

const ThemeToggle = () => {
    const { mode, setMode } = useThemeManager();

    const handleThemeChange = (event, newMode) => {
        if (newMode !== null) {
            setMode(newMode);
        }
    };

    return (
        <ToggleButtonGroup value={mode} exclusive onChange={handleThemeChange} aria-label="Theme mode" size="small">
            {themeOptions.map((option) => (
                <Tooltip title={option.label} key={option.value}>
                    <ToggleButton value={option.value} aria-label={option.label}>
                        {option.icon}
                    </ToggleButton>
                </Tooltip>
            ))}
        </ToggleButtonGroup>
    );
};

export default ThemeToggle;