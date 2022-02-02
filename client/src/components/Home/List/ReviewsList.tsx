import { Grid, Pagination } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { reviewsSelectors } from '../../../redux/reducers/reviews'
import { theme } from '../../../theme'
import ReviewItem from './ReviewItem'

const ReviewsList: FC = () => {
    const reviews = useAppSelector(reviewsSelectors.reviews)
    const count = useAppSelector(reviewsSelectors.count)

    const router = useRouter()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const page = router.query.page ? +router.query.page : 1

    const handleChange = (value: number) => {
        if (router.query.movie || router.query.author) {
            return router.push({ query: { ...router.query, page: value } })
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
                        id={review.id}
                        filmName={review.film.name}
                        author={`${review.author.firstName} ${review.author.lastName}`}
                        avgRating={review.avgRating!}
                        image={review.image}
                    />
                ))}
            </Grid>
            {count > 20 && (
                <Pagination
                    size={isSm ? 'large' : 'medium'}
                    count={Math.ceil(count / 20)}
                    page={page}
                    onChange={(_, value) => handleChange(value)}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: { xs: 2, sm: '20px', lg: '28px' },
                        mb: '4px',
                    }}
                />
            )}
        </>
    )
}

export default ReviewsList
