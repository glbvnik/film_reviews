import { Container } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import CreateReviewForm from '../components/CreateReview/CreateReviewForm'
import OmdbDialog from '../components/CreateReview/Dialog/OmdbDialog'
import OmdbFilmsList from '../components/CreateReview/List/OmdbFilmsList'
import { useStyles } from '../styles/classes'

const CreateReview: NextPage = () => {
    const classes = useStyles()

    return (
        <Container disableGutters className={classes.maxWidth}>
            <OmdbDialog />
            <CreateReviewForm />
            <OmdbFilmsList />
        </Container>
    )
}

export default CreateReview
