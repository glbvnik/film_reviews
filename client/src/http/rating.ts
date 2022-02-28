import $api from './index'

export const RatingAPI = {
    async create(rating: number, reviewId: number, userUuId: string) {
        await $api.post(`reviews/${reviewId}/user/${userUuId}/ratings`, {
            rating,
        })
    },
    async update(rating: number, reviewId: number, userUuId: string) {
        await $api.put(`reviews/${reviewId}/user/${userUuId}/ratings`, {
            rating,
        })
    },
    async delete(reviewId: number, userUuId: string) {
        await $api.delete(`reviews/${reviewId}/user/${userUuId}/ratings`)
    },
}
