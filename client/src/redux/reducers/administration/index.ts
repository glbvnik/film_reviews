import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRole, IUserAdministration } from '../../../models/user'
import { RootState } from '../../store'

interface AdministrationState {
    users: IUserAdministration[] | null
    roles: IRole[] | null
    isUsersLoading: boolean
    isActionLoading: boolean
}

const initialState: AdministrationState = {
    users: null,
    roles: null,
    isUsersLoading: false,
    isActionLoading: false,
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
        setRoles: (state, { payload }: PayloadAction<IRole[]>) => ({
            ...state,
            roles: payload,
        }),
        setIsUsersLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isUsersLoading: payload,
        }),
        setIsActionLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isActionLoading: payload,
        }),
    },
})

export const { setUsers, setRoles, setIsUsersLoading, setIsActionLoading } =
    administrationSlice.actions

export const administrationSelectors = {
    all: ({ administration }: RootState) => administration,
    users: ({ administration }: RootState) => administration.users,
    roles: ({ administration }: RootState) => administration.roles,
    isUsersLoading: ({ administration }: RootState) =>
        administration.isUsersLoading,
    isActionLoading: ({ administration }: RootState) =>
        administration.isActionLoading,
}

export default administrationSlice.reducer
