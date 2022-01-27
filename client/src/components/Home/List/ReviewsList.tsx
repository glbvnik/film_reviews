import { Grid, Pagination } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { reviewsSelectors } from '../../../redux/reducers/reviews'
import { getReviews } from '../../../redux/reducers/reviews/action-creators'
import { theme } from '../../../theme'
import ReviewItem from './ReviewItem'

const ReviewsList: FC = () => {
    const reviews = useAppSelector(reviewsSelectors.reviews)
    const count = useAppSelector(reviewsSelectors.count)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const page = router.query.page ? +router.query.page : 1

    const handleChange = (value: number) => {
        if (router.query.movie || router.query.author) {
            dispatch(
                getReviews({
                    movie: router.query.movie as string,
                    author: router.query.author as string,
                    limit: 20,
                    offset: (value - 1) * 20,
                })
            )

            return router.push(
                { query: { ...router.query, page: value } },
                undefined,
                { shallow: true }
            )
        }

        if (page !== value) {
            router.push(`/${value}`)
        }
    }

    return (
        <>
            <Grid
                container
                columns={{ sm: 2, lg: 3, xl: 4 }}
                rowSpacing={{ xs: 2, sm: 1, md: 2, lg: 3, xl: 4 }}
                columnSpacing={{ sm: 1, md: 2, xl: 3 }}
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
            {count > 20 && (
                <Pagination
                    size={isSm ? 'large' : 'small'}
                    count={Math.ceil(count / 20)}
                    page={page}
                    onChange={(_, value) => handleChange(value)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: { xs: 2, lg: 3 },
                    }}
                />
            )}
        </>
    )
}

export default ReviewsList
