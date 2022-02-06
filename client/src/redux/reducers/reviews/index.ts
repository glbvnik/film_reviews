import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IReview, IReviewsResponse } from '../../../models/review'
import { RootState } from '../../store'

interface ReviewsState {
    reviews: IReview[] | null
    count: number
    isReviewsLoading: boolean
    currentReview: IReview | null
    isCommentLoading: boolean
}

const initialState: ReviewsState = {
    reviews: null,
    count: 0,
    isReviewsLoading: false,
    currentReview: null,
    isCommentLoading: false,
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
        setCurrentReview: (state, { payload }: PayloadAction<IReview>) => ({
            ...state,
            currentReview: payload,
        }),
        setIsCommentLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isCommentLoading: payload,
        }),
    },
    extraReducers: {
        [HYDRATE]: (state, { payload }) => ({
            ...state,
            ...payload.reviews,
        }),
    },
})

export const {
    setReviews,
    setIsReviewsLoading,
    setCurrentReview,
    setIsCommentLoading,
} = reviewsSlice.actions

export const reviewsSelectors = {
    allReviews: ({ reviews }: RootState) => reviews,
    reviews: ({ reviews }: RootState) => reviews.reviews,
    count: ({ reviews }: RootState) => reviews.count,
    isReviewsLoading: ({ reviews }: RootState) => reviews.isReviewsLoading,
    currentReview: ({ reviews }: RootState) => reviews.currentReview,
    isCommentLoading: ({ reviews }: RootState) => reviews.isCommentLoading,
}

export default reviewsSlice.reducer
