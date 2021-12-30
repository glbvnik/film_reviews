import { Container } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import OmdbDialog from '../components/FilmsForReview/Dialog/OmdbDialog'
import FilmsForReviewForm from '../components/FilmsForReview/FilmsForReviewForm'
import OmdbFilmsList from '../components/FilmsForReview/List/OmdbFilmsList'
import { useStyles } from '../styles/classes'

const FilmsForReview: NextPage = () => {
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
