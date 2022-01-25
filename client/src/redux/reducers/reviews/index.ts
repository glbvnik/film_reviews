import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IReview, IReviewsResponse } from '../../../models/review'
import { RootState } from '../../store'

interface ReviewsState {
    reviews: IReview[] | null
    count: number
    isReviewsLoading: boolean
}

const initialState: ReviewsState = {
    reviews: null,
    count: 0,
    isReviewsLoading: false,
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews: (state, { payload }: PayloadAction<IReviewsResponse>) => ({
            ...state,
            ...payload,
        }),
        setIsReviewsLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isReviewsLoading: payload,
        }),
    },
    extraReducers: {
        [HYDRATE]: (state, { payload }) => ({
            ...state,
            ...payload.reviews,
        }),
    },
})

export const { setReviews, setIsReviewsLoading } = reviewsSlice.actions

export const reviewsSelectors = {
    allReviews: ({ reviews }: RootState) => reviews,
    reviews: ({ reviews }: RootState) => reviews.reviews,
    count: ({ reviews }: RootState) => reviews.count,
    isReviewsLoading: ({ reviews }: RootState) => reviews.isReviewsLoading,
}

export default reviewsSlice.reducer
