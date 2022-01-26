import { Film } from '../db/models/classes/film'
import { Review } from '../db/models/classes/review'
import { User } from '../db/models/classes/user'
import { IFilm } from '../types/film'
import { IReviewInputs } from '../types/review'

export const ReviewService = {
    async create(
        inputs: { review: string; film: string },
        imageFileName: string,
        userUuId: string
    ) {
        const { review, film } = inputs

        const parsedFilm: IFilm = JSON.parse(film)

        const filmCandidate = await Film.findOne({
            where: { imdbId: parsedFilm.imdbId },
            attributes: ['imdbId'],
        })

        if (!filmCandidate) {
            await Film.create(parsedFilm)
        }

        await Review.create({
            ...(JSON.parse(review) as IReviewInputs),
            image: imageFileName,
            filmImdbId: parsedFilm.imdbId,
            userUuId,
        })
    },
    async getReviews() {
        const res = await Review.findAndCountAll({
            // limit: 1,
            // offset: 1,
            include: [
                { model: Film, attributes: ['name'] },
                { model: User, attributes: ['firstName', 'lastName'] },
            ],
            order: [['createdAt', 'DESC']],
        })

        return { reviews: res.rows, count: res.count }
    },
}
