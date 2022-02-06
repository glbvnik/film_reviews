import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserAdministration } from '../../../models/user'
import { RootState } from '../../store'

interface AdministrationState {
    users: IUserAdministration[] | null
    isUsersLoading: boolean
    isAllowCommentsLoading: boolean
}

const initialState: AdministrationState = {
    users: null,
    isUsersLoading: false,
    isAllowCommentsLoading: false,
}

export const administrationSlice = createSlice({
    name: 'administration',
    initialState,
    reducers: {
        setUsers: (
            state,
            { payload }: PayloadAction<IUserAdministration[]>
        ) => ({
            ...state,
            users: payload,
        }),
        setIsUsersLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isUsersLoading: payload,
        }),
        setIsAllowCommentsLoading: (
            state,
            { payload }: PayloadAction<boolean>
        ) => ({
            ...state,
            isAllowCommentsLoading: payload,
        }),
    },
})

export const { setUsers, setIsUsersLoading, setIsAllowCommentsLoading } =
    administrationSlice.actions

export const administrationSelectors = {
    all: ({ administration }: RootState) => administration,
    users: ({ administration }: RootState) => administration.users,
    isUsersLoading: ({ administration }: RootState) =>
        administration.isUsersLoading,
    isAllowCommentsLoading: ({ administration }: RootState) =>
        administration.isAllowCommentsLoading,
}

export default administrationSlice.reducer
