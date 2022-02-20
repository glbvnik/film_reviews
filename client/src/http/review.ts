import { IReview, IReviewQuery, IReviewsResponse } from '../models/review'
import $api from './index'

export const ReviewApi = {
    async create(formData: FormData) {
        await $api.post('/review-management/create', formData)
    },
    async update(formData: FormData, id: number) {
        await $api.patch(`/review-management/update/${id}`, formData)
    },
    async fetch(params: IReviewQuery = { limit: 20, offset: 0 }) {
        const { data } = await $api.get<IReviewsResponse>(
            'review-management/reviews',
            {
                params,
            }
        )

        return data
    },
    async count() {
        const { data } = await $api.get<number>('review-management/reviews', {
            params: { isCount: true },
        })

        return data
    },
    async fetchOne(
        id: number,
        refreshToken?: string,
        isPublishedOnly?: boolean
    ) {
        const { data } = await $api.get<{ review: IReview }>(
            `review-management/reviews/${id}`,
            {
                headers: refreshToken && {
                    Cookie: `refreshToken=${refreshToken}`,
                },
                params: { isPublishedOnly },
            }
        )

        return data.review
    },
}
