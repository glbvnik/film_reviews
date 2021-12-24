import axios from 'axios'
import { UserApi } from './user'

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true

            try {
                await UserApi.refresh()

                return $api.request(originalRequest)
            } catch (e) {}
        }

        throw error
    }
)

export default $api
