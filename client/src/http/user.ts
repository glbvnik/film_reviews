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
        await $api.post('user-management/register', inputs)
    },
    async login(inputs: LoginInputs) {
        const { data } = await $api.post<IUser>('user-management/login', inputs)

        return data
    },
    async logout() {
        await $api.post('user-management/logout')
    },
    async refresh() {
        const { data } = await $api.get<IUser>('user-management/refresh')

        return data
    },
    async setPasswordResetLink(email: string) {
        await $api.patch('user-management/reset-password', {
            email,
        })
    },
    async resetPassword({ passwordResetLink, password }: ResetPasswordPayload) {
        await $api.patch(
            `user-management/reset-password/${passwordResetLink}`,
            { password }
        )
    },
    async changePassword(uuId: string, inputs: IChangePasswordInputs) {
        await $api.patch(`user-management/${uuId}/change-password`, inputs)
    },
    async fetchUsers() {
        const { data } = await $api.get<IUserAdministration[]>(
            'user-management/users'
        )

        return data
    },
    async fetchUsersWithRoles() {
        const { data } = await $api.get<{
            users: IUserAdministration[]
            roles: IRole[]
        }>('user-management/users?isWithRoles=1')

        return data
    },
    async allowComments(data: IAllowCommentsData) {
        await $api.patch(`user-management/${data.uuId}/allow-comments`, {
            isCommentsAllowed: data.isCommentsAllowed,
        })
    },
    async addUserRole(inputs: IUserRoleInputs) {
        await $api.post(`user-management/${inputs.uuId}/role`, {
            roleId: inputs.roleId,
        })
    },
    async removeUserRole(inputs: IUserRoleInputs) {
        await $api.delete(
            `user-management/${inputs.uuId}/role/${inputs.roleId}`
        )
    },
}
