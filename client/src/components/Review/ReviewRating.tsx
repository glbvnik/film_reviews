import StarIcon from '@mui/icons-material/Star'
import { Box, Rating } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { RatingAPI } from '../../http/rating'
import { reviewsSelectors } from '../../redux/reducers/reviews'

const ReviewRating: FC = () => {
    const review = useAppSelector(reviewsSelectors.currentReview)!

    const [rating, setRating] = useState(
        review.ratings && review.ratings[0] ? review.ratings[0].rating : null
    )

    const router = useRouter()

    const handleRatingChange = async (value: number | null) => {
        setRating(value)

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
        <Box display="flex" alignItems="center" fontSize="21px" my={1}>
            {review.ratings ? (
                <Rating
                    size="large"
                    value={rating}
                    onChange={(_, value) => handleRatingChange(value)}
                    sx={{ mr: 1 }}
                />
            ) : (
                <StarIcon
                    color="primary"
                    sx={{ fontSize: '34px', mr: '4px' }}
                />
            )}

            <span style={{ paddingTop: '4px' }}>{review.avgRating}</span>
        </Box>
    )
}

export default ReviewRating
