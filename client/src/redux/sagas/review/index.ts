import { fork, put, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call } from 'redux-saga/effects'
import { ReviewApi } from '../../../http/review'
import { IOmdbFullFilm } from '../../../models/omdb'
import { IReviewInputs } from '../../../models/review'
import { setAsyncAction, setIsLoading } from '../../reducers/app'
import { createReview } from '../../reducers/review/action-creators'

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

        yield put(setIsLoading(true))

        const textForServer = review.text
            .split('\n')
            .filter((p) => p !== '')
            .map((p) => `<p>${p}</p>`)
            .toString()

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
                isSuccess: true,
                errorMessage: '',
            })
        )
    } catch (e) {
        console.log('Error:', e)
    }
}

function* reviewWatcher() {
    yield takeEvery(createReview, handleCreateReview)
}

export default function* reviewSaga() {
    yield all([fork(reviewWatcher)])
}
