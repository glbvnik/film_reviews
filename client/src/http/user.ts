import { CancelToken } from 'axios'
import $api from '.'
import { IUser } from '../models/user'

export interface RegisterInputs {
    email: string
    password: string
    firstName: string
    lastName: string
}

export type LoginInputs = Omit<RegisterInputs, 'firstName' | 'lastName'>

export const UserApi = {
    async register(
        inputs: RegisterInputs,
        cancelToken: CancelToken,
    ) {
        const { status } = await $api.post<IUser>(
            '/user-management/register',
            inputs,
            { cancelToken },
        )

        return status
    },
    async login(inputs: LoginInputs, cancelToken: CancelToken) {
        const userData = await $api.post<IUser>('/user-management/login', inputs, {
            cancelToken,
        })

        return userData.data
    },
    async logout() {
        await $api.post('/user-management/logout')
    },
    async refresh() {
        const userData = await $api.get<IUser>('/user-management/refresh')

        return userData.data
    },
    async fetchUsers() {
        const users = await $api.get<IUser[]>('/user-management/users')

        return users.data
    },
}
