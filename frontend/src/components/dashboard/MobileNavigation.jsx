import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { mobileNavItems } from './NavigationConfig';

const MobileNavigation = () => {
    const [value, setValue] = useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', md: 'none' } }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                {mobileNavItems.map((item) => (
                    <BottomNavigationAction
                        key={item.text}
                        label={item.text}
                        icon={item.icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
};

export default MobileNavigation;