import { IReviewQuery, IReviewsResponse } from '../models/review'
import $api from './index'

export const ReviewApi = {
    async create(formData: FormData) {
        await $api.post('/review-management/create', formData)
    },
    async fetch(params: IReviewQuery = { limit: 20, offset: 0 }) {
        const { data } = await $api.get<IReviewsResponse>(
            '/review-management/reviews',
            { params }
        )

        return data
    },
    async count() {
        const { data } = await $api.get<number>('/review-management/reviews', {
            params: { isCount: true },
        })

        return data
    },
}
