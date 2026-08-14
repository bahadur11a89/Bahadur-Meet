const lightPalette = {
  primary: {
    main: '#0E72ED', // Zoom Blue
    light: '#4295F5',
    dark: '#0A5BBF',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FFB020', // Accent Yellow
    light: '#FFC861',
    dark: '#CC8C00',
    contrastText: '#000000',
  },
  error: {
    main: '#D32F2F',
  },
  warning: {
    main: '#FBC02D',
  },
  info: {
    main: '#2196F3',
  },
  success: {
    main: '#4CAF50',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  background: {
    default: '#F4F5F7', // Light background
    paper: '#FFFFFF',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#0E72ED', // Zoom Blue (can be slightly adjusted for dark mode if needed)
    light: '#4295F5',
    dark: '#0A5BBF',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#FFB020', // Accent Yellow
    light: '#FFC861',
    dark: '#CC8C00',
    contrastText: '#000000',
  },
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  background: {
    default: '#1A1A1A', // Dark background
    paper: '#2C2C2C',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
  },
};

export { lightPalette, darkPalette };