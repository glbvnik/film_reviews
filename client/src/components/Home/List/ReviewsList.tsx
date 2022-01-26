import { Container, Grid } from '@mui/material'
import React, { FC } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { reviewsSelectors } from '../../../redux/reducers/reviews'
import ReviewItem from './ReviewItem'

const ReviewsList: FC = () => {
    const reviews = useAppSelector(reviewsSelectors.reviews)
    const count = useAppSelector(reviewsSelectors.count)

    return (
        <Container>
            <Grid
                container
                columns={{ sm: 2, lg: 3, xl: 4 }}
                rowSpacing={{ xs: 2, sm: 1, md: 2, lg: 3 }}
                columnSpacing={{ sm: 1, md: 2, xl: 3 }}
                p={{ xs: 1, md: 2, lg: 3 }}
            >
                {reviews?.map((review) => (
                    <ReviewItem
                        key={review.id}
                        filmName={review.Film.name}
                        author={`${review.User.firstName} ${review.User.lastName}`}
                        rating={review.rating}
                        image={review.image}
                    />
                ))}
            </Grid>
        </Container>
    )
}

export default ReviewsList
