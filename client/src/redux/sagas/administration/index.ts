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
import {
    IAllowCommentsData,
    IRole,
    IUserAdministration,
    IUserRoleInputs,
} from '../../../models/user'
import {
    setIsActionLoading,
    setIsUsersLoading,
    setRoles,
    setUsers,
} from '../../reducers/administration'
import {
    addUserRole,
    ADMINISTRATION_ACTIONS,
    allowComments,
    getUsers,
    removeUserRole,
} from '../../reducers/administration/action-creators'

function* handleUserRoleAction(action: PayloadAction<IUserRoleInputs>) {
    try {
        yield put(setIsActionLoading(true))

        if (action.type === ADMINISTRATION_ACTIONS.ADD_ROLE) {
            yield call(UserApi.addUserRole, action.payload)

            yield put(getUsers({ isWithRoles: true }))
        } else {
            yield call(UserApi.removeUserRole, action.payload)

            yield put(getUsers({ isWithRoles: true }))
        }
    } finally {
        yield put(setIsActionLoading(false))
    }
}

function* handleAllowComments({ payload }: PayloadAction<IAllowCommentsData>) {
    try {
        yield put(setIsActionLoading(true))

        yield call(UserApi.allowComments, payload)

        yield put(getUsers())
    } finally {
        yield put(setIsActionLoading(false))
    }
}

function* handleGetUsers({
    payload,
}: PayloadAction<{ isWithRoles: boolean } | undefined>): Generator<
    StrictEffect,
    void,
    IUserAdministration[] | { users: IUserAdministration[]; roles: IRole[] }
> {
    try {
        yield put(setIsUsersLoading(true))

        if (payload?.isWithRoles) {
            const data = yield call(UserApi.fetchUsersWithRoles)

            yield put(
                setUsers(
                    (data as { users: IUserAdministration[]; roles: IRole[] })
                        .users
                )
            )
            yield put(
                setRoles(
                    (data as { users: IUserAdministration[]; roles: IRole[] })
                        .roles
                )
            )
        } else {
            const users = yield call(UserApi.fetchUsers)

            yield put(setUsers(users as IUserAdministration[]))
        }
    } finally {
        yield put(setIsUsersLoading(false))
    }
}

function* administrationWatcher() {
    yield takeEvery(getUsers, handleGetUsers)
    yield takeEvery(allowComments, handleAllowComments)
    yield takeEvery([addUserRole, removeUserRole], handleUserRoleAction)
}

export default function* administrationSaga() {
    yield all([fork(administrationWatcher)])
}
