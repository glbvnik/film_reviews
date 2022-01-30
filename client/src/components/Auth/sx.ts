import { createStyles } from '../../utils/createStyles'

export const styles = createStyles({
    formBox: {
        mx: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        '@media (min-width: 375px)': {
            mx: 3,
        },
        '@media (min-width: 411px)': {
            mx: 4,
        },
    },
    alert: {
        alignItems: 'center',
        width: '100%',
        mt: 2,
    },
})
