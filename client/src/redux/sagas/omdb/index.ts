import { PayloadAction } from '@reduxjs/toolkit'
import {
    all,
    call,
    fork,
    put,
    StrictEffect,
    takeEvery,
} from 'redux-saga/effects'
import { OmdbApi } from '../../../http/omdb'
import {
    IOmdbFilm,
    IOmdbFullFilm,
    IOmdbFullFilmInputs,
    IOmdbInputs,
} from '../../../models/omdb'
import {
    setIsOmdbLoading,
    setOmdb,
    setOmdbCurrentFilm,
} from '../../reducers/omdb'
import {
    getOmdbFilms,
    getOmdbFullFilm,
} from '../../reducers/omdb/action-creators'

function* handleFetch({
    payload,
}: PayloadAction<IOmdbInputs | IOmdbFullFilmInputs>): Generator<
    StrictEffect,
    void,
    [IOmdbFilm[], number] | IOmdbFullFilm
> {
    yield put(setIsOmdbLoading(true))

    try {
        if ('imdbId' in payload) {
            const film = yield call(
                OmdbApi.fetchFullFilm,
                ...(Object.values(payload) as [string, string])
            )

            yield put(setOmdbCurrentFilm(film as IOmdbFullFilm))
        } else {
            const res = (yield call(OmdbApi.fetchFilmsByTitle, payload)) as [
                IOmdbFilm[],
                number
            ]

            yield put(setOmdb(res))
        }
    } finally {
        yield put(setIsOmdbLoading(false))
    }
}

function* omdbWatcher() {
    yield takeEvery([getOmdbFilms, getOmdbFullFilm], handleFetch)
}

export default function* omdbSaga() {
    yield all([fork(omdbWatcher)])
}
