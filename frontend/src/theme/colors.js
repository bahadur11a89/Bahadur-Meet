const grey = {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
};

export const lightPalette = {
    primary: {
        main: '#0B57D0',
        light: '#4285F4',
        dark: '#0842A0',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#5f6368',
        contrastText: '#ffffff',
    },
    success: {
        main: '#1E8E3E',
        light: '#34A853',
        contrastText: '#ffffff',
    },
    warning: {
        main: '#F9AB00',
        contrastText: '#ffffff',
    },
    error: {
        main: '#D93025',
        light: '#EA4335',
        contrastText: '#ffffff',
    },
    info: {
        main: '#4285F4',
        contrastText: '#ffffff',
    },
    grey,
    background: {
        default: grey[50],
        paper: '#ffffff',
        surface: '#ffffff',
    },
    text: {
        primary: grey[800],
        secondary: grey[600],
        disabled: grey[400],
    },
    divider: grey[200],
    action: {
        active: grey[600],
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: 'rgba(0, 0, 0, 0.12)',
    },
};

export const darkPalette = {
    primary: {
        main: '#8AB4F8',
        light: '#A8C7FA',
        dark: '#669DF6',
        contrastText: '#202124',
    },
    secondary: {
        main: '#9AA0A6',
        contrastText: '#202124',
    },
    success: {
        main: '#81C995',
        contrastText: '#202124',
    },
    warning: {
        main: '#FDD663',
        contrastText: '#202124',
    },
    error: {
        main: '#F28B82',
        contrastText: '#202124',
    },
    info: {
        main: '#8AB4F8',
        contrastText: '#202124',
    },
    grey,
    background: {
        default: '#202124',
        paper: '#2d2e30', // A slightly lighter surface for cards
        surface: '#3c4043', // For elements on top of paper
    },
    text: {
        primary: '#E8EAED',
        secondary: '#9AA0A6',
        disabled: '#5F6368',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    action: {
        active: '#E8EAED',
        hover: 'rgba(255, 255, 255, 0.08)',
        selected: 'rgba(255, 255, 255, 0.16)',
        disabled: 'rgba(255, 255, 255, 0.3)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        focus: 'rgba(255, 255, 255, 0.12)',
    },
};