import { Container } from '@mui/material'
import React, { FC } from 'react'
import { useStyles } from '../../styles/classes'
import OmdbDialog from './Dialog/OmdbDialog'
import FilmsForReviewForm from './FilmsForReviewForm'
import OmdbFilmsList from './List/OmdbFilmsList'

const FilmsForReview: FC = () => {
    const classes = useStyles()

    return (
        <Container disableGutters className={classes.maxWidth}>
            <OmdbDialog />
            <FilmsForReviewForm />
            <OmdbFilmsList />
        </Container>
    )
}

export default FilmsForReview
