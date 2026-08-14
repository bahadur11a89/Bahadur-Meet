import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';

const getAppTheme = (mode) => {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  let theme = createTheme({
    palette: {
      mode,
      ...palette,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none', // Keep button text as is
      },
    },
    shape: {
      borderRadius: 8, // Consistent border radius
    },
    spacing: 8, // Default spacing unit (e.g., theme.spacing(1) = 8px)
    shadows: [
      'none', // No shadow for index 0
      '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)', // Custom shadow 1
      '0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)', // Custom shadow 2
      // ... you can define more shadows up to 25
      ...Array(22).fill('0px 2px 4px rgba(0,0,0,0.1)') // Fill remaining with a generic shadow
    ],
    breakpoints: {
      values: {
        xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536,
      },
    },
  });

  theme = responsiveFontSizes(theme); // Make font sizes responsive
  return theme;
};

export default getAppTheme;