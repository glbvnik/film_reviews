import { fork, put, StrictEffect, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call } from 'redux-saga/effects'
import { OmdbApi } from '../../../http/omdb'
import {
    IOmdbFilm,
    IOmdbFullFilm,
    IOmdbFullFilmInputs,
    IOmdbInputs,
} from '../../../models/omdb'
import { setIsLoading } from '../../reducers/app'
import { setOmdb, setOmdbCurrentFilm } from '../../reducers/omdb'
import {
    getOmdbFilms,
    getOmdbFullFilm,
} from '../../reducers/omdb/action-creators'

function* handleFetch({
    payload,
}: PayloadAction<IOmdbInputs | IOmdbFullFilmInputs>): Generator<
    StrictEffect,
    void,
    [IOmdbFilm[], string] | IOmdbFullFilm
> {
    yield put(setIsLoading(true))

    try {
        if ('imdbId' in payload) {
            const result = yield call(
                OmdbApi.fetchFullFilm,
                ...(Object.values(payload) as [string, string])
            )

            yield put(setOmdbCurrentFilm(result as IOmdbFullFilm))
        } else {
            const film = yield call(
                OmdbApi.fetchFilmsByTitle,
                ...(Object.values(payload) as [
                    string,
                    number,
                    'movie' | 'series'
                ])
            )

            yield put(setOmdb(film as [IOmdbFilm[], string]))
        }
    } finally {
        yield put(setIsLoading(false))
    }
}

function* omdbWatcher() {
    yield takeEvery([getOmdbFilms, getOmdbFullFilm], handleFetch)
}

export default function* omdbSaga() {
    yield all([fork(omdbWatcher)])
}
