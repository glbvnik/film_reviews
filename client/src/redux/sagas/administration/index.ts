import { PayloadAction } from '@reduxjs/toolkit'
import {
    all,
    call,
    fork,
    put,
    StrictEffect,
    takeEvery,
} from 'redux-saga/effects'
import { UserApi } from '../../../http/user'
import { IAllowCommentsData, IUserAdministration } from '../../../models/user'
import {
    setIsAllowCommentsLoading,
    setIsUsersLoading,
    setUsers,
} from '../../reducers/administration'
import {
    allowComments,
    getUsers,
} from '../../reducers/administration/action-creators'

function* handleAllowComments({ payload }: PayloadAction<IAllowCommentsData>) {
    try {
        yield put(setIsAllowCommentsLoading(true))

        yield call(UserApi.allowComments, payload)

        yield put(getUsers())
    } finally {
        yield put(setIsAllowCommentsLoading(false))
    }
}

function* handleGetUsers(): Generator<
    StrictEffect,
    void,
    IUserAdministration[]
> {
    try {
        yield put(setIsUsersLoading(true))

        const users = yield call(UserApi.fetchUsers)

        yield put(setUsers(users))
    } finally {
        yield put(setIsUsersLoading(false))
    }
}

function* administrationWatcher() {
    yield takeEvery(getUsers, handleGetUsers)
    yield takeEvery(allowComments, handleAllowComments)
}

export default function* administrationSaga() {
    yield all([fork(administrationWatcher)])
}
