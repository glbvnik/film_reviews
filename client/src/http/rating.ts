import { IRatingInputs } from '../models/rating'
import $api from './index'

export const RatingAPI = {
    async create(inputs: IRatingInputs) {
        await $api.post('/rating-management/create', inputs)
    },
    async update(inputs: IRatingInputs) {
        await $api.put('/rating-management/update', inputs)
    },
    async delete(reviewId: number) {
        await $api.delete(`/rating-management/delete/${reviewId}`)
    },
}
