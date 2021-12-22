import { all, call, cancel, fork, put, select, StrictEffect, take, takeEvery } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import axios, { CancelToken } from 'axios'
import { LoginInputs, RegisterInputs, UserApi } from '../../../http/user'
import { IUser } from '../../../models/user'
import { mapToError } from '../../../utils/mapToError'
import { setIsLoading } from '../../reducers/app'
import {
    AuthState,
    selectAuth,
    setIsRegistered,
    setLoginError,
    setUser,
    setValidationErrors,
} from '../../reducers/auth'
import { login, logout, refresh, register, resetErrors } from '../../reducers/auth/action_creators'

function* handleResetErrors(): Generator<StrictEffect, void, AuthState> {
    const { validationErrors, loginError } = yield select(selectAuth)

    if (validationErrors) {
        yield put(setValidationErrors(null))
    } else if (loginError) {
        yield put(setLoginError(''))
    }
}

function* resetErrorsWatcher() {
    yield takeEvery(resetErrors, handleResetErrors)
}

function* logoutHandler() {
    try {
        yield take(logout)

        yield put(setIsLoading(true))

        yield call(UserApi.logout)

        yield put(setUser({} as IUser))
    } catch (e) {
    } finally {
        yield put(setIsLoading(false))
    }
}

function* refreshHandler(): Generator<StrictEffect, void, IUser> {
    yield take(refresh)

    try {
        yield put(setIsLoading(true))

        const userData = yield call(UserApi.refresh)

        yield put(setUser(userData))

        yield fork(logoutHandler)
    } catch (e) {
    } finally {
        yield put(setIsLoading(false))
    }
}

function* handleAuth(
    { payload }: PayloadAction<RegisterInputs | LoginInputs>,
    cancelToken: CancelToken,
): Generator<StrictEffect, void, number | IUser> {
    try {
        yield put(setIsLoading(true))

        if ('firstName' in payload) {
            const status = yield call(UserApi.register, payload, cancelToken)

            if (status === 200) {
                yield put(setIsRegistered(true))
            }
        } else {
            const userData = (yield call(UserApi.login, payload, cancelToken)) as IUser

            yield put(setUser(userData))

            yield fork(logoutHandler)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if ('firstName' in payload) {
                yield put(setValidationErrors(mapToError(e.response!.data.errors)))
            } else {
                yield put(setLoginError(e.response!.data.message))
            }
        }
    } finally {
        yield put(setIsLoading(false))
    }
}

function* authWatcher(): Generator<StrictEffect, void, any> {
    let task
    let abortController = axios.CancelToken.source()

    while (true) {
        const payload = yield take([register, login])

        if (task) {
            abortController.cancel()

            yield cancel(task)

            abortController = axios.CancelToken.source()
        }

        task = yield fork(handleAuth, payload, abortController.token)
    }
}

export default function* authSaga() {
    yield all([
        fork(authWatcher),
        fork(refreshHandler),
        fork(resetErrorsWatcher),
    ])
}
