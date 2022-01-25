import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../models/user'
import { IValidationErrors } from '../../../models/validationError'
import { RootState } from '../../store'

export interface AuthState {
    user: IUser | null
    validationErrors: IValidationErrors | null
    loginError: string
    isRegistered: boolean
    isPasswordResetLinkSet: boolean
    isPasswordReset: boolean
    isAuthLoading: boolean
    isRefreshLoading: boolean
    isLogoutLoading: boolean
}

const initialState: AuthState = {
    user: null,
    validationErrors: null,
    loginError: '',
    isRegistered: false,
    isPasswordResetLinkSet: false,
    isPasswordReset: false,
    isAuthLoading: false,
    isRefreshLoading: true,
    isLogoutLoading: false,
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
        setIsAuthLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isAuthLoading: payload,
        }),
        setIsRefreshLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isRefreshLoading: payload,
        }),
        setIsLogoutLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isRefreshLoading: payload,
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
    setIsAuthLoading,
    setIsRefreshLoading,
    setIsLogoutLoading,
} = authSlice.actions

export const authSelectors = {
    auth: ({ auth }: RootState) => auth,
    user: ({ auth }: RootState) => auth.user,
    validationErrors: ({ auth }: RootState) => auth.validationErrors,
    loginError: ({ auth }: RootState) => auth.loginError,
    isRegistered: ({ auth }: RootState) => auth.isRegistered,
    isPasswordResetLinkSet: ({ auth }: RootState) =>
        auth.isPasswordResetLinkSet,
    isPasswordReset: ({ auth }: RootState) => auth.isPasswordReset,
    isAuthLoading: ({ auth }: RootState) => auth.isAuthLoading,
    isRefreshLoading: ({ auth }: RootState) => auth.isRefreshLoading,
    isLogoutLoading: ({ auth }: RootState) => auth.isLogoutLoading,
}

export default authSlice.reducer
