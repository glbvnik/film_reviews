import { Rating } from '../db/models/classes/rating'
import ApiError from '../errors/api'
import { IRating } from '../types/rating'

export const RatingService = {
    async create(rating: Omit<IRating, 'createdAt' | 'updatedAt'>) {
        await Rating.create(rating)
    },
    async update(rating: Omit<IRating, 'createdAt' | 'updatedAt'>) {
        await Rating.update(rating, {
            where: { reviewId: rating.reviewId, userUuId: rating.userUuId },
        })
    },
    async delete(data: Omit<IRating, 'rating' | 'createdAt' | 'updatedAt'>) {
        const count = await Rating.destroy({
            where: data,
        })

        if (!count) {
            throw ApiError.notFound('Rating not found')
        }
    },
}
