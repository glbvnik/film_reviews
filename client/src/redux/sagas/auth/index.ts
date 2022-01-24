import {
    all,
    call,
    cancel,
    fork,
    put,
    select,
    StrictEffect,
    take,
    takeEvery,
} from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import axios, { CancelToken } from 'axios'
import {
    LoginInputs,
    RegisterInputs,
    ResetPasswordPayload,
    UserApi,
} from '../../../http/user'
import { IUser } from '../../../models/user'
import { mapToError } from '../../../utils/mapToError'
import {
    AuthState,
    selectAuth,
    setIsAuthLoading,
    setIsLogoutLoading,
    setIsPasswordReset,
    setIsPasswordResetLinkSet,
    setIsRefreshLoading,
    setIsRegistered,
    setLoginError,
    setUser,
    setValidationErrors,
} from '../../reducers/auth'
import {
    login,
    logout,
    refresh,
    register,
    resetErrors,
    resetPassword,
    setPasswordResetLink,
} from '../../reducers/auth/action-creators'

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

function* refreshHandler(): Generator<StrictEffect, void, IUser> {
    yield take(refresh)

    try {
        const userData = yield call(UserApi.refresh)

        yield put(setUser(userData))

        yield fork(logoutHandler)
    } catch (e) {
    } finally {
        yield put(setIsRefreshLoading(false))
    }
}

function* logoutHandler() {
    try {
        yield take(logout)

        yield put(setIsLogoutLoading(true))

        yield call(UserApi.logout)

        yield put(setUser(null))
    } catch (e) {
    } finally {
        yield put(setIsLogoutLoading(false))
    }
}

function* handleAuth(
    {
        payload,
        type,
    }: PayloadAction<
        RegisterInputs | LoginInputs | string | ResetPasswordPayload
    >,
    cancelToken: CancelToken
): Generator<StrictEffect, void, number | IUser> {
    try {
        yield put(setIsAuthLoading(true))

        if (typeof payload !== 'string' && 'firstName' in payload) {
            yield call(UserApi.register, payload, cancelToken)

            yield put(setIsRegistered(true))
        } else if (typeof payload !== 'string' && 'email' in payload) {
            const userData = (yield call(
                UserApi.login,
                payload,
                cancelToken
            )) as IUser

            yield put(setUser(userData))

            yield fork(logoutHandler)
        } else if (typeof payload === 'string') {
            yield call(UserApi.setPasswordResetLink, payload, cancelToken)

            yield put(setIsPasswordResetLinkSet(true))
        } else {
            yield call(UserApi.resetPassword, payload, cancelToken)

            yield put(setIsPasswordReset(true))
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response!.data.errors) {
                yield put(
                    setValidationErrors(mapToError(e.response!.data.errors))
                )
            } else {
                yield put(setLoginError(e.response!.data.message))
            }
        }
    } finally {
        yield put(setIsAuthLoading(false))
    }
}

function* authWatcher(): Generator<StrictEffect, void, any> {
    let task
    let abortController = axios.CancelToken.source()

    while (true) {
        const action = yield take([
            register,
            login,
            setPasswordResetLink,
            resetPassword,
        ])

        if (task) {
            abortController.cancel()

            yield cancel(task)

            abortController = axios.CancelToken.source()
        }

        task = yield fork(handleAuth, action, abortController.token)
    }
}

export default function* authSaga() {
    yield all([
        fork(authWatcher),
        fork(refreshHandler),
        fork(resetErrorsWatcher),
    ])
}
