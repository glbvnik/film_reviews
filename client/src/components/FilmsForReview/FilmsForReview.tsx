import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React, { FC, useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setIsDialog } from '../../redux/reducers/app'
import { useStyles } from '../../styles/classes'
import OmdbDialog from './Dialog/OmdbDialog'
import FilmsForReviewForm from './FilmsForReviewForm'
import OmdbFilmsList from './List/OmdbFilmsList'

const FilmsForReview: FC = () => {
    const classes = useStyles()

    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            dispatch(setIsDialog(false))
        }
    }, [])

    return (
        <Box className={classes.scrollBox}>
            <Container>
                <OmdbDialog />
                <FilmsForReviewForm />
                <OmdbFilmsList />
            </Container>
        </Box>
    )
}

export default FilmsForReview
