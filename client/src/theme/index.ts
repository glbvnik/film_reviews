import { deepOrange, deepPurple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    breakpoints: {
        values: { xs: 0, sm: 540, md: 900, lg: 1200, xl: 1536 },
    },
    palette: {
        primary: {
            main: deepOrange[500],
        },
        secondary: {
            main: deepPurple[500],
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                disableGutters: true,
            },
            styleOverrides: {
                root: {
                    maxWidth: '1200px',
                    '@media (min-width: 2048px)': {
                        maxWidth: '1400px',
                    },
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: 'none',
            },
            styleOverrides: {
                root: {
                    cursor: 'pointer',
                },
            },
        },
    },
})
