import { createAction } from '@reduxjs/toolkit'
import { ICommentInputs } from '../../../models/comment'
import { IOmdbFullFilm } from '../../../models/omdb'
import { IReviewInputs, IReviewQuery } from '../../../models/review'

export enum REVIEW_ACTION {
    CREATE_REVIEW = 'CREATE_REVIEW',
    UPDATE_REVIEW = 'UPDATE_REVIEW',
    GET_REVIEWS = 'GET_REVIEWS',
    GET_REVIEW = 'GET_REVIEW',
    CREATE_COMMENT = 'CREATE_COMMENT',
    DELETE_COMMENT = 'DELETE_COMMENT',
}

export const createReview = createAction<{
    review: IReviewInputs
    film: IOmdbFullFilm
}>(REVIEW_ACTION.CREATE_REVIEW)

export const updateReview = createAction<IReviewInputs>(
    REVIEW_ACTION.UPDATE_REVIEW
)

export const getReviews = createAction<IReviewQuery>(REVIEW_ACTION.GET_REVIEWS)

export const getReview = createAction<number>(REVIEW_ACTION.GET_REVIEW)

export const createComment = createAction<ICommentInputs>(
    REVIEW_ACTION.CREATE_COMMENT
)

export const deleteComment = createAction<number>(REVIEW_ACTION.DELETE_COMMENT)
