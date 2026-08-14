import React, { useState, useMemo, createContext, useContext } from 'react';
import { ThemeProvider, CssBaseline, useMediaQuery } from '@mui/material';
import getAppTheme from './theme';

const ThemeContext = createContext({
    mode: 'light',
    setMode: () => {},
});

export const useThemeManager = () => useContext(ThemeContext);

const AppThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('system');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const resolvedMode = useMemo(() => {
        if (mode === 'system') {
            return prefersDarkMode ? 'dark' : 'light';
        }
        return mode;
    }, [mode, prefersDarkMode]);

    const theme = useMemo(() => getAppTheme(resolvedMode), [resolvedMode]);

    const themeManager = useMemo(() => ({
        mode,
        setMode,
    }), [mode]);

    return (
        <ThemeContext.Provider value={themeManager}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default AppThemeProvider;