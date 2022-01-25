import CloseIcon from '@mui/icons-material/Close'
import {
    AppBar,
    Button,
    Dialog,
    IconButton,
    Slide,
    Toolbar,
    Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import React from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { appSelectors, setIsDialog } from '../../../redux/reducers/app'
import {
    clearOmdbCurrentFilm,
    omdbSelectors,
} from '../../../redux/reducers/omdb'
import { theme } from '../../../theme'
import OmdbDialogContent from './OmdbDialogContent'

const Transition = React.forwardRef(
    (
        props: TransitionProps & {
            children: React.ReactElement
        },
        ref: React.Ref<unknown>
    ) => <Slide direction="up" ref={ref} {...props} />
)

const OmdbDialog = () => {
    const isDialog = useAppSelector(appSelectors.isDialog)
    const currentFilm = useAppSelector(omdbSelectors.currentFilm)
    const isOmdbLoading = useAppSelector(omdbSelectors.isOmdbLoading)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const handleClose = () => {
        dispatch(setIsDialog(false))
        dispatch(clearOmdbCurrentFilm())
    }

    return (
        <Dialog
            fullScreen={!isSm}
            open={isDialog}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            ml: 1,
                        }}
                    >
                        {currentFilm?.Title}
                    </Typography>
                    <Button
                        color="inherit"
                        disabled={!currentFilm}
                        onClick={() =>
                            router.push(
                                process.env
                                    .NEXT_PUBLIC_REVIEWS_CREATE_REVIEW_ROUTE!
                            )
                        }
                    >
                        Create review
                    </Button>
                </Toolbar>
            </AppBar>
            <OmdbDialogContent
                currentFilm={currentFilm}
                isLoading={isOmdbLoading}
            />
        </Dialog>
    )
}

export default OmdbDialog
