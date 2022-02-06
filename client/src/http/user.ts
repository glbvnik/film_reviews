import { CancelToken } from 'axios'
import $api from '.'
import { IAllowCommentsData, IUser, IUserAdministration } from '../models/user'

export interface RegisterInputs {
    email: string
    password: string
    firstName: string
    lastName: string
}

export type LoginInputs = Omit<RegisterInputs, 'firstName' | 'lastName'>

export interface ResetPasswordPayload {
    passwordResetLink: string
    password: string
}

export const UserApi = {
    async register(inputs: RegisterInputs, cancelToken: CancelToken) {
        await $api.post('user-management/register', inputs, { cancelToken })
    },
    async login(inputs: LoginInputs, cancelToken: CancelToken) {
        const { data } = await $api.post<IUser>(
            'user-management/login',
            inputs,
            {
                cancelToken,
            }
        )

        return data
    },
    async logout() {
        await $api.post('user-management/logout')
    },
    async refresh() {
        const { data } = await $api.get<IUser>('user-management/refresh')

        return data
    },
    async setPasswordResetLink(email: string, cancelToken: CancelToken) {
        await $api.patch(
            'user-management/reset-password',
            {
                email,
            },
            { cancelToken }
        )
    },
    async resetPassword(
        { passwordResetLink, password }: ResetPasswordPayload,
        cancelToken: CancelToken
    ) {
        await $api.patch(
            `user-management/reset-password/${passwordResetLink}`,
            { password },
            { cancelToken }
        )
    },
    async fetchUsers() {
        const { data } = await $api.get<IUserAdministration[]>(
            'user-management/users'
        )

        return data
    },
    async allowComments(data: IAllowCommentsData) {
        await $api.patch(`user-management/allow-comments/${data.uuId}`, {
            isCommentsAllowed: data.isCommentsAllowed,
        })
    },
}
