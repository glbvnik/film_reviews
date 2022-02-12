import { createAction } from '@reduxjs/toolkit'
import { IAllowCommentsData, IUserRoleInputs } from '../../../models/user'

export enum ADMINISTRATION_ACTIONS {
    GET_USERS = 'GET_USERS',
    ALLOW_COMMENTS = 'ALLOW_COMMENTS',
    ADD_ROLE = 'ADD_ROLE',
    REMOVE_ROLE = 'REMOVE_ROLE',
}

export const getUsers = createAction<{ isWithRoles: boolean } | undefined>(
    ADMINISTRATION_ACTIONS.GET_USERS
)

export const allowComments = createAction<IAllowCommentsData>(
    ADMINISTRATION_ACTIONS.ALLOW_COMMENTS
)

export const addUserRole = createAction<IUserRoleInputs>(
    ADMINISTRATION_ACTIONS.ADD_ROLE
)

export const removeUserRole = createAction<IUserRoleInputs>(
    ADMINISTRATION_ACTIONS.REMOVE_ROLE
)
