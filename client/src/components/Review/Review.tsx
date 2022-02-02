import { Box, Container, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { authSelectors } from '../../redux/reducers/auth'
import { reviewsSelectors } from '../../redux/reducers/reviews'
import { styles } from './sx'

const Review: FC = () => {
    const review = useAppSelector(reviewsSelectors.currentReview)!
    const user = useAppSelector(authSelectors.user)

    return (
        <Container>
            <Box
                p={{ xs: 1 }}
                py={{ sm: 2 }}
                px={{ sm: 12, md: 17, lg: 32, xl: 45 }}
                pb={{ sm: '4px' }}
            >
                <Typography component="h2" sx={styles.reviewFilmName}>
                    {review.film.name}
                </Typography>
                <Box display="flex" alignItems="center" fontSize="21px" my={1}>
                    {user && (
                        <Rating
                            size="large"
                            value={
                                review.ratings![0]
                                    ? review.ratings![0].rating
                                    : null
                            }
                            sx={{ mr: 1 }}
                        />
                    )}
                    <span>{review.avgRating}</span>
                </Box>
                <Typography component="h3" sx={styles.reviewAuthor}>
                    {review.author.firstName} {review.author.lastName}
                </Typography>
                <Typography component="span" sx={styles.reviewDate}>
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </Typography>
            </Box>
            <Box
                p={{ xs: 1 }}
                py={{ sm: 2, md: 4, lg: 3 }}
                px={{ sm: 5, md: 8, lg: 22, xl: 35 }}
            >
                <Image
                    priority
                    src={`${process.env.NEXT_PUBLIC_API_URL!}/images/${
                        review.image
                    }`}
                    alt={review.film.name}
                    layout="responsive"
                    objectFit="contain"
                    height={1}
                    width={2}
                />
            </Box>
            <Typography
                component="article"
                dangerouslySetInnerHTML={{ __html: review.text }}
                p={{ xs: 1 }}
                px={{ sm: 12, md: 17, lg: 32, xl: 45 }}
            />
        </Container>
    )
}

export default Review
