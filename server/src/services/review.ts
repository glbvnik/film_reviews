import { Op, Sequelize } from 'sequelize'
import { Film } from '../db/models/classes/film'
import { Review } from '../db/models/classes/review'
import { User } from '../db/models/classes/user'
import ApiError from '../errors/api'
import { IFilm } from '../types/film'
import { IReviewInputs, IReviewQuery } from '../types/review'

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
    async getReviews(query: IReviewQuery) {
        const { movie, author, limit, offset, isCount } = query

        if (isCount) {
            return await Review.count({ where: { isPublished: true } })
        }

        const res = await Review.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: Film,
                    attributes: ['name'],
                    where: { name: { [Op.iLike]: `%${movie || ''}%` } },
                },
                {
                    model: User,
                    attributes: ['firstName', 'lastName'],
                    where: Sequelize.where(
                        Sequelize.fn(
                            'concat',
                            Sequelize.col('firstName'),
                            ' ',
                            Sequelize.col('lastName')
                        ),
                        {
                            [Op.iLike]: `%${author || ''}%`,
                        }
                    ),
                },
            ],
            where: { isPublished: true },
            order: [['createdAt', 'DESC']],
        })

        return { reviews: res.rows, count: res.count }
    },
    async getReview(id: string) {
        const review = await Review.findOne({
            where: { id: +id, isPublished: true },
        })

        if (!review) {
            throw ApiError.notFound('Review not found')
        }

        return review
    },
}
