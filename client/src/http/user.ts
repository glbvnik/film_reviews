import $api from '.'
import {
    IAllowCommentsData,
    IChangePasswordInputs,
    IRole,
    IUser,
    IUserAdministration,
    IUserRoleInputs,
} from '../models/user'

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
    async register(inputs: RegisterInputs) {
        await $api.post('users/register', inputs)
    },
    async login(inputs: LoginInputs) {
        const { data } = await $api.post<IUser>('users/login', inputs)

        return data
    },
    async logout() {
        await $api.post('users/logout')
    },
    async refresh() {
        const { data } = await $api.get<IUser>('users/refresh')

        return data
    },
    async setPasswordResetLink(email: string) {
        await $api.patch('users/reset-password', {
            email,
        })
    },
    async resetPassword({ passwordResetLink, password }: ResetPasswordPayload) {
        await $api.patch(`users/reset-password/${passwordResetLink}`, {
            password,
        })
    },
    async changePassword(uuId: string, inputs: IChangePasswordInputs) {
        await $api.patch(`users/${uuId}/change-password`, inputs)
    },
    async fetchUsers() {
        const { data } = await $api.get<IUserAdministration[]>('users')

        return data
    },
    async fetchUsersWithRoles() {
        const { data } = await $api.get<{
            users: IUserAdministration[]
            roles: IRole[]
        }>('users', { params: { isWithRoles: 1 } })

        return data
    },
    async allowComments(data: IAllowCommentsData) {
        await $api.patch(`users/${data.uuId}/allow-comments`, {
            isCommentsAllowed: data.isCommentsAllowed,
        })
    },
    async addUserRole(inputs: IUserRoleInputs) {
        await $api.post(`users/${inputs.uuId}/role`, {
            roleId: inputs.roleId,
        })
    },
    async removeUserRole(inputs: IUserRoleInputs) {
        await $api.delete(`users/${inputs.uuId}/role/${inputs.roleId}`)
    },
}
