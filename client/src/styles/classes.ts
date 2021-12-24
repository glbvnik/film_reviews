import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
    maxWidth: {
        maxWidth: '1200px',
        '@media (min-width: 2048px)': {
            maxWidth: '1400px',
        },
    },
})
