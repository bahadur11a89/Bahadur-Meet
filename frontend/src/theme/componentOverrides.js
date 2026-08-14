const getComponentOverrides = (theme) => {
    const { palette, shape, typography } = theme;

    return {
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                },
                html: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                    WebkitOverflowScrolling: 'touch',
                },
                body: {
                    margin: 0,
                    padding: 0,
                    width: '100%',
                    height: '100%',
                },
                '#root': {
                    width: '100%',
                    height: '100%',
                },
                '::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                },
                '::-webkit-scrollbar-thumb': {
                    backgroundColor: palette.grey[400],
                    borderRadius: '4px',
                },
                '::-webkit-scrollbar-track': {
                    backgroundColor: palette.grey[200],
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: typography.fontWeightBold,
                    borderRadius: shape.borderRadius * 0.75,
                    padding: '8px 16px',
                },
                containedPrimary: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: shape.borderRadius * 1.5,
                    boxShadow: theme.shadows[1],
                    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    '&:hover': {
                        boxShadow: theme.shadows[4],
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Disables MUI's default gradient
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderBottom: `1px solid ${palette.divider}`,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: `1px solid ${palette.divider}`,
                },
                paperAnchorRight: {
                    borderLeft: `1px solid ${palette.divider}`,
                    borderRight: 'none',
                }
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    ...typography.body2,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: shape.borderRadius * 0.75,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: typography.fontWeightMedium,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: palette.grey[800],
                    color: palette.common.white,
                },
                arrow: {
                    color: palette.grey[800],
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    height: '3px',
                    borderRadius: '3px 3px 0 0',
                },
            },
        },
    };
};

export default getComponentOverrides;