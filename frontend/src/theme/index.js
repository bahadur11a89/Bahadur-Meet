import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palettes';
import { typographySettings } from './typography';
import { lightShadows, darkShadows } from './shadows';
import breakpoints from './breakpoints';
import getComponentOverrides from './overrides';

export const getAppTheme = (mode) => {
    const palette = mode === 'light' ? lightPalette : darkPalette;
    const shadows = mode === 'light' ? lightShadows : darkShadows;

    let theme = createTheme({
        palette: {
            mode,
            ...palette,
        },
        typography: typographySettings,
        breakpoints,
        shadows,
        shape: {
            borderRadius: 12,
        },
        spacing: 8, // 8px grid system
    });

    theme.components = getComponentOverrides(theme);

    return responsiveFontSizes(theme);
};