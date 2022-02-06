import { createAction } from '@reduxjs/toolkit'
import { IAllowCommentsData } from '../../../models/user'

export enum ADMINISTRATION_ACTIONS {
    GET_USERS = 'GET_USERS',
    ALLOW_COMMENTS = 'ALLOW_COMMENTS',
}

export const getUsers = createAction(ADMINISTRATION_ACTIONS.GET_USERS)

export const allowComments = createAction<IAllowCommentsData>(
    ADMINISTRATION_ACTIONS.ALLOW_COMMENTS
)
