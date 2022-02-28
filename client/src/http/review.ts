import { IReview, IReviewQuery, IReviewsResponse } from '../models/review'
import $api from './index'

export const ReviewApi = {
    async create(formData: FormData) {
        await $api.post('/reviews', formData)
    },
    async update(formData: FormData, id: number) {
        await $api.patch(`/reviews/${id}`, formData)
    },
    async fetch(params: IReviewQuery = { limit: 20, offset: 0 }) {
        const { data } = await $api.get<IReviewsResponse>('reviews', {
            params,
        })

        return data
    },
    async count() {
        const { data } = await $api.get<number>('reviews', {
            params: { isCount: true },
        })

        return data
    },
    async fetchOne(
        id: number,
        refreshToken?: string,
        isPublishedOnly?: boolean
    ) {
        const { data } = await $api.get<{ review: IReview }>(`reviews/${id}`, {
            headers: refreshToken && {
                Cookie: `refreshToken=${refreshToken}`,
            },
            params: { isPublishedOnly },
        })

        return data.review
    },
    async delete(id: number, userUuId: string) {
        await $api.delete(`/reviews/${id}/user/${userUuId}`, {
            params: { userUuId },
        })
    },
}
