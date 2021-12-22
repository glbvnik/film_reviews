export const styles = {
    backgroundImage: {
        backgroundImage: 'url(/films-collage.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    formBox: {
        mx: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
}
