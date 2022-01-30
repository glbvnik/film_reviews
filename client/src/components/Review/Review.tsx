import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector'
import { reviewsSelectors } from '../../redux/reducers/reviews'

const Review: FC = () => {
    const review = useAppSelector(reviewsSelectors.currentReview)

    return <div></div>
}

export default Review
