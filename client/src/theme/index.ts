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
