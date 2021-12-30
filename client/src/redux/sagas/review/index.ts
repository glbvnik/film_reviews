import { fork, put, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call } from 'redux-saga/effects'
import { ReviewApi } from '../../../http/review'
import { IOmdbFullFilm } from '../../../models/omdb'
import { IReviewInputs } from '../../../models/review'
import { setIsLoading } from '../../reducers/app'
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
            throw 'No image'
        }

        if (!review.text) {
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
        formData.append('text', textForServer)
        formData.append('film', JSON.stringify(filmForServer))

        yield call(ReviewApi.create, formData)
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
