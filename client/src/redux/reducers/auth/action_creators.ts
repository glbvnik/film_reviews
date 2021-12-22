import { createAction } from '@reduxjs/toolkit'
import { LoginInputs, RegisterInputs } from '../../../http/user'

export enum AUTH_ACTIONS {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    REFRESH = 'REFRESH',
    RESET_ERRORS = 'RESET_ERRORS',
}

export const register = createAction<RegisterInputs>(AUTH_ACTIONS.REGISTER)

export const login = createAction<LoginInputs>(AUTH_ACTIONS.LOGIN)

export const logout = createAction(AUTH_ACTIONS.LOGOUT)

export const refresh = createAction(AUTH_ACTIONS.REFRESH)

export const resetErrors = createAction(AUTH_ACTIONS.RESET_ERRORS)
