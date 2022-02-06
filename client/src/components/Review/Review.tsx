import StarIcon from '@mui/icons-material/Star'
import { Box, Container, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { RatingAPI } from '../../http/rating'
import { reviewsSelectors } from '../../redux/reducers/reviews'
import CommentsList from './Comments/CommentsList'
import { styles } from './sx'

const Review: FC = () => {
    const review = useAppSelector(reviewsSelectors.currentReview)!

    const router = useRouter()

    const handleRatingChange = async (value: number | null) => {
        if (!value && review.ratings![0]) {
            await RatingAPI.delete(review.id)
        } else if (value && review.ratings![0]) {
            await RatingAPI.update({ reviewId: review.id, rating: value })
        } else {
            await RatingAPI.create({ reviewId: review.id, rating: value })
        }

        router.replace(router.asPath, undefined, { scroll: false })
    }

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
                {review.avgRating && (
                    <Box
                        display="flex"
                        alignItems="center"
                        fontSize="21px"
                        my={1}
                    >
                        {review.ratings ? (
                            <Rating
                                size="large"
                                value={
                                    review.ratings![0]
                                        ? review.ratings![0].rating
                                        : null
                                }
                                onChange={(_, value) =>
                                    handleRatingChange(value)
                                }
                                sx={{ mr: 1 }}
                            />
                        ) : (
                            <StarIcon
                                color="primary"
                                sx={{ fontSize: '34px', mr: '4px' }}
                            />
                        )}

                        <span style={{ paddingTop: '4px' }}>
                            {review.avgRating}
                        </span>
                    </Box>
                )}
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
                py={{ xs: 1, sm: 2, md: 4, lg: 3 }}
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
            <Box px={{ xs: 1, sm: 12, md: 17, lg: 32, xl: 45 }}>
                <Typography
                    component="article"
                    dangerouslySetInnerHTML={{ __html: review.text }}
                    pt={{ xs: 1 }}
                />
                <CommentsList />
            </Box>
        </Container>
    )
}

export default Review
