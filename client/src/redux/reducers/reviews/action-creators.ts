import { createAction } from '@reduxjs/toolkit'
import { IOmdbFullFilm } from '../../../models/omdb'
import { IReviewInputs, IReviewQuery } from '../../../models/review'

export enum REVIEW_ACTION {
    CREATE_REVIEW = 'CREATE_REVIEW',
    FETCH_FILMS = 'FETCH_FILMS',
}

export const createReview = createAction<{
    review: IReviewInputs
    film: IOmdbFullFilm
}>(REVIEW_ACTION.CREATE_REVIEW)

export const getReviews = createAction<IReviewQuery>(REVIEW_ACTION.FETCH_FILMS)
