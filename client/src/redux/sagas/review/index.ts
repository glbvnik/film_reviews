import { fork, put, StrictEffect, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call, select } from 'redux-saga/effects'
import { ReviewApi } from '../../../http/review'
import { IOmdbFullFilm } from '../../../models/omdb'
import {
    IReview,
    IReviewInputs,
    IReviewQuery,
    IReviewsResponse,
    ReviewActionsEnum,
} from '../../../models/review'
import { IUser } from '../../../models/user'
import { setAsyncAction } from '../../reducers/app'
import { authSelectors } from '../../reducers/auth'
import { setOmdbCurrentFilm } from '../../reducers/omdb'
import {
    clearCurrentReview,
    reviewsSelectors,
    setCurrentReview,
    setIsReviewsLoading,
    setReviews,
} from '../../reducers/reviews'
import {
    createReview,
    deleteReview,
    getReview,
    getReviews,
    updateReview,
} from '../../reducers/reviews/action-creators'

function* handleDeleteReview() {
    try {
        yield put(setIsReviewsLoading(true))

        const { id } = (yield select(reviewsSelectors.currentReview)) as IReview
        const { uuId } = (yield select(authSelectors.user)) as IUser

        yield call(ReviewApi.delete, id, uuId)

        yield put(
            setAsyncAction({
                type: ReviewActionsEnum.DELETE_REVIEW,
                isSuccess: true,
                errorMessage: '',
            })
        )
        yield put(clearCurrentReview())
    } finally {
        yield put(setIsReviewsLoading(false))
    }
}

function* handleUpdateReview({
    payload: review,
}: PayloadAction<IReviewInputs>): Generator<
    StrictEffect,
    void,
    IReview | IUser
> {
    try {
        if (!review.text) {
            yield put(
                setAsyncAction({
                    errorMessage: 'Please, provide a review text',
                })
            )
            throw 'No text'
        }

        yield put(setIsReviewsLoading(true))

        const textForServer = review.text
            .split('\n')
            .filter((p) => p !== '')
            .map((p) => `<p class='review-text-p'>${p}</p>`)
            .join('')

        const formData = new FormData()

        if (review.image) {
            formData.append('image', review.image)
        }

        const { id, author } = (yield select(
            reviewsSelectors.currentReview
        )) as IReview
        const { uuId } = (yield select(authSelectors.user)) as IUser

        if (author.uuId !== uuId) {
            formData.append(
                'review',
                JSON.stringify({
                    text: textForServer,
                    isUnpublishedByEditor: !review.isPublished,
                })
            )
        } else {
            formData.append(
                'review',
                JSON.stringify({
                    text: textForServer,
                    isPublished: review.isPublished,
                })
            )
        }

        yield call(ReviewApi.update, formData, id)

        yield put(
            setAsyncAction({
                type: ReviewActionsEnum.UPDATE_REVIEW,
                isSuccess: true,
                errorMessage: '',
            })
        )
    } finally {
        yield put(setIsReviewsLoading(false))
    }
}

function* handleGetReview({
    payload,
}: PayloadAction<number>): Generator<StrictEffect, void, IReview> {
    try {
        const review = yield call(ReviewApi.fetchOne, payload, undefined, true)

        yield put(setCurrentReview(review))
        yield put(
            setOmdbCurrentFilm({ Title: review.film.name } as IOmdbFullFilm)
        )
    } catch (e) {}
}

function* handleGetReviews({
    payload,
}: PayloadAction<IReviewQuery>): Generator<
    StrictEffect,
    void,
    IReviewsResponse
> {
    try {
        const res = yield call(ReviewApi.fetch, payload)

        yield put(setReviews(res))
    } catch (e) {}
}

function* handleCreateReview({
    payload,
}: PayloadAction<{
    review: IReviewInputs
    film: IOmdbFullFilm
}>) {
    try {
        const { review, film } = payload

        if (!review.image) {
            yield put(
                setAsyncAction({
                    errorMessage: 'Please, provide a review image',
                })
            )
            throw 'No image'
        }

        if (!review.text) {
            yield put(
                setAsyncAction({
                    errorMessage: 'Please, provide a review text',
                })
            )
            throw 'No text'
        }

        yield put(setIsReviewsLoading(true))

        const textForServer = review.text
            .split('\n')
            .filter((p) => p !== '')
            .map((p) => `<p class='review-text-p'>${p}</p>`)
            .join('')

        const filmForServer = {
            imdbId: film.imdbID,
            name: film.Title,
            year: +film.Year,
            country: film.Country.split(', '),
            genres: film.Genre.split(', '),
            runtime: +film.Runtime,
            directors: film.Director.split(', '),
            actors: film.Actors.split(', '),
            imdbRating: +film.imdbRating,
        }

        const formData = new FormData()

        formData.append('image', review.image)
        formData.append(
            'review',
            JSON.stringify({
                text: textForServer,
                isPublished: review.isPublished,
            })
        )
        formData.append('film', JSON.stringify(filmForServer))

        yield call(ReviewApi.create, formData)

        yield put(
            setAsyncAction({
                type: ReviewActionsEnum.CREATE_REVIEW,
                isSuccess: true,
                errorMessage: '',
            })
        )
    } finally {
        yield put(setIsReviewsLoading(false))
    }
}

function* reviewWatcher() {
    yield takeEvery(createReview, handleCreateReview)
    yield takeEvery(getReviews, handleGetReviews)
    yield takeEvery(getReview, handleGetReview)
    yield takeEvery(updateReview, handleUpdateReview)
    yield takeEvery(deleteReview, handleDeleteReview)
}

export default function* reviewSaga() {
    yield all([fork(reviewWatcher)])
}
