import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { IUser } from '../../../models/user'
import { IValidationErrors } from '../../../models/validationError'
import { RootState } from '../../store/index'

export interface AuthState {
    user: IUser | null
    validationErrors: IValidationErrors | null
    loginError: string
    isRegistered: boolean
    isPasswordResetLinkSet: boolean
    isPasswordReset: boolean
}

const initialState: AuthState = {
    user: null,
    validationErrors: null,
    loginError: '',
    isRegistered: false,
    isPasswordResetLinkSet: false,
    isPasswordReset: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IUser | null>) => ({
            ...state,
            user: payload,
        }),
        setValidationErrors: (
            state,
            { payload }: PayloadAction<IValidationErrors | null>
        ) => ({
            ...state,
            validationErrors: payload,
        }),
        setLoginError: (state, { payload }: PayloadAction<string>) => ({
            ...state,
            loginError: payload,
        }),
        setIsRegistered: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isRegistered: payload,
        }),
        setIsPasswordResetLinkSet: (
            state,
            { payload }: PayloadAction<boolean>
        ) => ({
            ...state,
            isPasswordResetLinkSet: payload,
        }),
        setIsPasswordReset: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isPasswordReset: payload,
        }),
        clearAuthStateBooleans: (state) => ({
            ...state,
            isRegistered: false,
            isPasswordResetLinkSet: false,
            isPasswordReset: false,
        }),
    },
    extraReducers: {
        [HYDRATE]: (state, action) => ({
            ...state,
            ...action.payload.auth,
        }),
    },
})

export const {
    setUser,
    setValidationErrors,
    setLoginError,
    setIsRegistered,
    setIsPasswordResetLinkSet,
    setIsPasswordReset,
    clearAuthStateBooleans,
} = authSlice.actions

export const selectAuth = ({ auth }: RootState) => auth

export default authSlice.reducer
