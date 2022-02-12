import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { reviewsSelectors } from '../../redux/reducers/reviews'
import CommentsList from './Comments/CommentsList'
import ReviewRating from './ReviewRating'
import { styles } from './sx'

const Review: FC = () => {
    const review = useAppSelector(reviewsSelectors.currentReview)!

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
                {(review.avgRating || review.ratings) && <ReviewRating />}
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