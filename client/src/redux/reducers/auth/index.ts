import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../models/user'
import { IValidationErrors } from '../../../models/validationError'
import { RootState } from '../../store'

export interface AuthState {
    user: IUser | null
    errors: {
        validationErrors: IValidationErrors | null
        loginError: string
    }
    states: {
        isRegistered: boolean
        isPasswordResetLinkSet: boolean
        isPasswordReset: boolean
        isPasswordChanged: boolean
        isLoggedOut: boolean
    }
    loaders: {
        isAuthLoading: boolean
        isRefreshLoading: boolean
        isLogoutLoading: boolean
    }
}

const initialState: AuthState = {
    user: null,
    errors: {
        validationErrors: null,
        loginError: '',
    },
    states: {
        isRegistered: false,
        isPasswordResetLinkSet: false,
        isPasswordReset: false,
        isPasswordChanged: false,
        isLoggedOut: false,
    },
    loaders: {
        isAuthLoading: false,
        isRefreshLoading: true,
        isLogoutLoading: false,
    },
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
            errors: {
                ...state.errors,
                validationErrors: payload,
            },
        }),
        setLoginError: (state, { payload }: PayloadAction<string>) => ({
            ...state,
            errors: {
                ...state.errors,
                loginError: payload,
            },
        }),
        setIsRegistered: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            states: {
                ...state.states,
                isRegistered: payload,
            },
        }),
        setIsPasswordResetLinkSet: (
            state,
            { payload }: PayloadAction<boolean>
        ) => ({
            ...state,
            states: {
                ...state.states,
                isPasswordResetLinkSet: payload,
            },
        }),
        setIsPasswordReset: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            states: {
                ...state.states,
                isPasswordReset: payload,
            },
        }),
        setIsLoggedOut: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            states: {
                ...state.states,
                isLoggedOut: payload,
            },
        }),
        setIsPasswordChanged: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            states: {
                ...state.states,
                isPasswordChanged: payload,
            },
        }),
        clearAuthStates: (state) => ({
            ...state,
            states: {
                isRegistered: false,
                isPasswordResetLinkSet: false,
                isPasswordReset: false,
                isPasswordChanged: false,
                isLoggedOut: false,
            },
        }),
        setIsAuthLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            loaders: {
                ...state.loaders,
                isAuthLoading: payload,
            },
        }),
        setIsRefreshLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            loaders: {
                ...state.loaders,
                isRefreshLoading: payload,
            },
        }),
        setIsLogoutLoading: (state, { payload }: PayloadAction<boolean>) => ({
            ...state,
            isLogoutLoading: payload,
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
    setIsPasswordChanged,
    clearAuthStates,
    setIsAuthLoading,
    setIsRefreshLoading,
    setIsLogoutLoading,
    setIsLoggedOut,
} = authSlice.actions

export const authSelectors = {
    auth: ({ auth }: RootState) => auth,
    user: ({ auth }: RootState) => auth.user,
    errors: ({ auth }: RootState) => auth.errors,
    validationErrors: ({ auth }: RootState) => auth.errors.validationErrors,
    loginError: ({ auth }: RootState) => auth.errors.loginError,
    isRegistered: ({ auth }: RootState) => auth.states.isRegistered,
    isPasswordResetLinkSet: ({ auth }: RootState) =>
        auth.states.isPasswordResetLinkSet,
    isPasswordReset: ({ auth }: RootState) => auth.states.isPasswordReset,
    isPasswordChanged: ({ auth }: RootState) => auth.states.isPasswordChanged,
    isLoggedOut: ({ auth }: RootState) => auth.states.isLoggedOut,
    isAuthLoading: ({ auth }: RootState) => auth.loaders.isAuthLoading,
    isRefreshLoading: ({ auth }: RootState) => auth.loaders.isRefreshLoading,
    isLogoutLoading: ({ auth }: RootState) => auth.loaders.isLogoutLoading,
}

export default authSlice.reducer
