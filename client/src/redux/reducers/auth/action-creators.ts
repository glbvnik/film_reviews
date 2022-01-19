import { createAction } from '@reduxjs/toolkit'
import {
    LoginInputs,
    RegisterInputs,
    ResetPasswordPayload,
} from '../../../http/user'

export enum AUTH_ACTIONS {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    FORK_LOGOUT = 'FORK_LOGOUT',
    RESET_ERRORS = 'RESET_ERRORS',
    SET_PASSWORD_RESET_LINK = 'SET_PASSWORD_RESET_LINK',
    RESET_PASSWORD = 'RESET_PASSWORD',
}

export const register = createAction<RegisterInputs>(AUTH_ACTIONS.REGISTER)

export const login = createAction<LoginInputs>(AUTH_ACTIONS.LOGIN)

export const logout = createAction(AUTH_ACTIONS.LOGOUT)

export const forkLogout = createAction(AUTH_ACTIONS.FORK_LOGOUT)

export const resetErrors = createAction(AUTH_ACTIONS.RESET_ERRORS)

export const setPasswordResetLink = createAction<string>(
    AUTH_ACTIONS.SET_PASSWORD_RESET_LINK
)

export const resetPassword = createAction<ResetPasswordPayload>(
    AUTH_ACTIONS.RESET_PASSWORD
)
