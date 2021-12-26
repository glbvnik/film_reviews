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
import React from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { selectApp, setIsDialog } from '../../../redux/reducers/app'
import { clearOmdbCurrentFilm, selectOmdb } from '../../../redux/reducers/omdb'
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
    const { isLoading, isDialog } = useAppSelector(selectApp)
    const { currentFilm } = useAppSelector(selectOmdb)

    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setIsDialog(false))
        dispatch(clearOmdbCurrentFilm())
    }

    return (
        <Dialog
            fullScreen
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
                        onClick={handleClose}
                    >
                        Create review
                    </Button>
                </Toolbar>
            </AppBar>
            <OmdbDialogContent
                currentFilm={currentFilm}
                isLoading={isLoading}
            />
        </Dialog>
    )
}

export default OmdbDialog
