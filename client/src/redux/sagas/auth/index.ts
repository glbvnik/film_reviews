import {
    all,
    call,
    fork,
    put,
    select,
    StrictEffect,
    take,
    takeEvery,
} from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    LoginInputs,
    RegisterInputs,
    ResetPasswordPayload,
    UserApi,
} from '../../../http/user'
import { IChangePasswordInputs, IUser } from '../../../models/user'
import { mapToError } from '../../../utils/mapToError'
import {
    authSelectors,
    AuthState,
    setIsAuthLoading,
    setIsLoggedOut,
    setIsLogoutLoading,
    setIsPasswordChanged,
    setIsPasswordReset,
    setIsPasswordResetLinkSet,
    setIsRefreshLoading,
    setIsRegistered,
    setLoginError,
    setUser,
    setValidationErrors,
} from '../../reducers/auth'
import {
    changePassword,
    login,
    logout,
    refresh,
    register,
    resetErrors,
    resetPassword,
    setPasswordResetLink,
} from '../../reducers/auth/action-creators'

function* handleResetErrors(): Generator<
    StrictEffect,
    void,
    AuthState['errors']
> {
    const { validationErrors, loginError } = yield select(authSelectors.errors)

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
        yield put(setIsLoggedOut(true))
    } finally {
        yield put(setIsLogoutLoading(false))
    }
}

function* handleChangePassword({
    payload,
}: PayloadAction<IChangePasswordInputs>): Generator<StrictEffect, void, IUser> {
    try {
        yield put(setIsAuthLoading(true))

        const { uuId } = yield select(authSelectors.user)

        yield call(UserApi.changePassword, uuId, payload)

        yield put(setIsPasswordChanged(true))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response!.data.errors) {
                yield put(
                    setValidationErrors(mapToError(e.response!.data.errors))
                )
            }
        }
    } finally {
        yield put(setIsAuthLoading(false))
    }
}

function* handleResetPassword({
    payload,
}: PayloadAction<string | ResetPasswordPayload>) {
    try {
        yield put(setIsAuthLoading(true))

        if (typeof payload === 'string') {
            yield call(UserApi.setPasswordResetLink, payload)

            yield put(setIsPasswordResetLinkSet(true))
        } else {
            yield call(UserApi.resetPassword, payload)

            yield put(setIsPasswordReset(true))
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response!.data.errors) {
                yield put(
                    setValidationErrors(mapToError(e.response!.data.errors))
                )
            }
        }
    } finally {
        yield put(setIsAuthLoading(false))
    }
}

function* handleRegisterLogin({
    payload,
}: PayloadAction<RegisterInputs | LoginInputs>): Generator<
    StrictEffect,
    void,
    IUser
> {
    try {
        yield put(setIsAuthLoading(true))

        if ('firstName' in payload) {
            yield call(UserApi.register, payload)

            yield put(setIsRegistered(true))
        } else {
            const userData = yield call(UserApi.login, payload)

            yield put(setUser(userData))
            yield put(setIsLoggedOut(false))

            yield fork(logoutHandler)
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
    yield takeEvery([register, login], handleRegisterLogin)
    yield takeEvery([setPasswordResetLink, resetPassword], handleResetPassword)
    yield takeEvery(changePassword, handleChangePassword)
}

export default function* authSaga() {
    yield all([
        fork(authWatcher),
        fork(refreshHandler),
        fork(resetErrorsWatcher),
    ])
}
