function responsiveFontSizes({ sm, md, lg }) {
    return {
        '@media (min-width:600px)': {
            fontSize: sm,
        },
        '@media (min-width:900px)': {
            fontSize: md,
        },
        '@media (min-width:1200px)': {
            fontSize: lg,
        },
    };
}

export const typographySettings = {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        ...responsiveFontSizes({ sm: '3rem', md: '3.5rem', lg: '4rem' }),
    },
    h2: {
        fontWeight: 700,
        fontSize: '2rem',
        ...responsiveFontSizes({ sm: '2.5rem', md: '3rem', lg: '3.5rem' }),
    },
    h3: {
        fontWeight: 700,
        fontSize: '1.75rem',
        ...responsiveFontSizes({ sm: '2rem', md: '2.25rem', lg: '2.5rem' }),
    },
    h4: {
        fontWeight: 700,
        fontSize: '1.5rem',
        ...responsiveFontSizes({ sm: '1.6rem', md: '1.75rem', lg: '2rem' }),
    },
    h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        ...responsiveFontSizes({ sm: '1.3rem', md: '1.4rem', lg: '1.5rem' }),
    },
    h6: {
        fontWeight: 600,
        fontSize: '1.1rem',
        ...responsiveFontSizes({ sm: '1.15rem', md: '1.2rem', lg: '1.25rem' }),
    },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 400 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
};