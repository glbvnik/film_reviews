import { Container } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import CreateReviewForm from '../components/CreateReview/CreateReviewForm'
import OmdbFilmsList from '../components/CreateReview/List/OmdbFilmsList'
import { useStyles } from '../styles/classes'

const CreateReview: NextPage = () => {
    const classes = useStyles()

    return (
        <Container className={classes.maxWidth}>
            <CreateReviewForm />
            <OmdbFilmsList />
        </Container>
    )
}

export default CreateReview
