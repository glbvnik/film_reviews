import { Grid, Pagination } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { FC, RefObject, useEffect } from 'react'
import { DrawerSectionsEnum } from '../../constants/drawerSections'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { authSelectors } from '../../redux/reducers/auth'
import { clearReviews, reviewsSelectors } from '../../redux/reducers/reviews'
import { getReviews } from '../../redux/reducers/reviews/action-creators'
import { theme } from '../../theme'
import Loader from '../UI/Loader'
import StateMessage from '../UI/StateMessage'
import ReviewItem from './ReviewItem'

interface ReviewsListProps {
    parentRef: RefObject<HTMLDivElement>
}

const ReviewsList: FC<ReviewsListProps> = ({ parentRef }) => {
    const reviews = useAppSelector(reviewsSelectors.reviews)
    const count = useAppSelector(reviewsSelectors.count)
    const user = useAppSelector(authSelectors.user)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const isSm = useMediaQuery(theme.breakpoints.up('sm'))

    const page = router.query.page ? +router.query.page : 1

    const isMyReview = router.query.section === DrawerSectionsEnum.MY_REVIEWS
    const isUnpublishedReviews =
        router.query.section === DrawerSectionsEnum.UNPUBLISHED_REVIEWS

    const handleChange = (value: number) => {
        if (
            router.query.movie ||
            router.query.author ||
            isMyReview ||
            isUnpublishedReviews
        ) {
            return router.push({ query: { ...router.query, page: value } })
        }

        if (page !== value) {
            router.push(`/${value}`)
        }
    }

    useEffect(() => {
        if (isMyReview || isUnpublishedReviews) {
            dispatch(clearReviews())
        }
    }, [])

    useEffect(() => {
        if (isMyReview || isUnpublishedReviews) {
            dispatch(
                getReviews({
                    limit: 20,
                    offset: (page - 1) * 20,
                    userUuId: user!.uuId,
                    isUnpublishedByEditor: isUnpublishedReviews,
                })
            )
        }

        parentRef.current?.scroll({ top: 0 })
    }, [page, router.query.section])

    if (!reviews) {
        return <Loader />
    }

    if (reviews.length === 0) {
        return <StateMessage state="movie-not-found" />
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
