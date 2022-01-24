import { IReviewsResponse } from '../models/review'
import $api from './index'

export const ReviewApi = {
    async create(formData: FormData) {
        await $api.post('/review-management/create', formData)
    },
    async fetch() {
        const { data } = await $api.get<IReviewsResponse>(
            '/review-management/reviews'
        )

        return data
    },
}
