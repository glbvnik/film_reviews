import { createStyles } from '../../utils/createStyles'

export const styles = createStyles({
    reviewItem: {
        height: { xs: 200, sm: 225, xl: 250 },
        width: '100%',
    },
    reviewItemPaper: {
        display: 'flex',
        cursor: 'pointer',
        height: '100%',
        width: '100%',
        position: 'relative',
        span: {
            borderRadius: 'inherit',
        },
    },
    reviewItemBox: {
        alignSelf: 'flex-end',
        borderRadius: 'inherit',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        overflow: 'auto',
        maxHeight: '100%',
        width: '100%',
        px: 1,
        zIndex: 0,
    },
    reviewItemText: {
        color: 'white',
    },
    reviewItemBottomBox: {
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between',
    },
})
