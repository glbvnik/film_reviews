import { createAction } from '@reduxjs/toolkit'
import { IOmdbFullFilm } from '../../../models/omdb'
import { IReviewInputs } from '../../../models/review'

export enum REVIEW_ACTION {
    CREATE_REVIEW = 'CREATE_REVIEW',
}

export const createReview = createAction<{
    review: IReviewInputs
    film: IOmdbFullFilm
}>(REVIEW_ACTION.CREATE_REVIEW)
