import { fork, put, StrictEffect, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { all, call } from 'redux-saga/effects'
import { OmdbApi } from '../../../http/omdb'
import { IOmdbFilm, IOmdbInputs } from '../../../models/omdb'
import { setIsLoading } from '../../reducers/app'
import { setOmdb } from '../../reducers/omdb'
import { fetchOmdbFilms } from '../../reducers/omdb/action-creators'

function* handleFetchOmdbFilms({
    payload,
}: PayloadAction<IOmdbInputs>): Generator<
    StrictEffect,
    void,
    [IOmdbFilm[], string]
> {
    const { title, page, type } = payload

    yield put(setIsLoading(true))

    try {
        const result = yield call(OmdbApi.getFilmsByTitle, title, page, type)

        yield put(setOmdb(result))
    } finally {
        yield put(setIsLoading(true))
    }
}

function* omdbWatcher() {
    yield takeEvery(fetchOmdbFilms, handleFetchOmdbFilms)
}

export default function* omdbSaga() {
    yield all([fork(omdbWatcher)])
}
