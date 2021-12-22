import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../../models/user'
import { IValidationErrors } from '../../../models/validationError'
import { RootState } from './../../store/index'

export interface AuthState {
    user: IUser | null
    validationErrors: IValidationErrors | null
    loginError: string
    isRegistered: boolean
}

const initialState: AuthState = {
    user: null,
    validationErrors: null,
    loginError: '',
    isRegistered: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }: PayloadAction<IUser>) => ({
            ...state,
            user: payload,
        }),
        setValidationErrors: (
            state,
            { payload }: PayloadAction<IValidationErrors | null>,
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
    },
})

export const { setUser, setValidationErrors, setLoginError, setIsRegistered } =
    authSlice.actions

export const selectAuth = ({ auth }: RootState) => auth

export default authSlice.reducer
