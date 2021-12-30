import { Container } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import CreateReviewForm from '../components/CreateReview/CreateReviewForm'
import { useStyles } from '../styles/classes'

const CreateReview: NextPage = () => {
    const classes = useStyles()

    return (
        <Container disableGutters className={classes.maxWidth}>
            <CreateReviewForm />
        </Container>
    )
}

export default CreateReview
