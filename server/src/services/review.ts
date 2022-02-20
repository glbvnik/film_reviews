import { unlinkSync } from 'fs'
import { resolve } from 'path'
import { Op, Sequelize } from 'sequelize'
import { Comment } from '../db/models/classes/comment'
import { Film } from '../db/models/classes/film'
import { Rating } from '../db/models/classes/rating'
import { Review } from '../db/models/classes/review'
import { User } from '../db/models/classes/user'
import ApiError from '../errors/api'
import { IFilm } from '../types/film'
import { IReview, IReviewCreateInputs, IReviewQuery } from '../types/review'

export const ReviewService = {
    async create(
        review: IReviewCreateInputs,
        film: IFilm,
        imageFileName: string,
        userUuId: string
    ) {
        const filmCandidate = await Film.findOne({
            attributes: ['imdbId'],
            where: { imdbId: film.imdbId },
        })

        if (!filmCandidate) {
            await Film.create(film)
        }

        await Review.create({
            ...review,
            image: imageFileName,
            filmImdbId: film.imdbId,
            userUuId,
        })
    },
    async getReviews(query: IReviewQuery) {
        const {
            movie,
            author,
            limit,
            offset,
            isCount,
            userUuId,
            isUnpublishedByEditor,
        } = query

        if (isCount) {
            return await Review.count({ where: { isPublished: true } })
        }

        let where

        if (isUnpublishedByEditor) {
            where = { isUnpublishedByEditor }
        } else if (userUuId) {
            where = { userUuId }
        } else {
            where = { isPublished: true }
        }

        const res = await Review.findAndCountAll({
            attributes: {
                include: [
                    [
                        Sequelize.literal(
                            `(SELECT CAST(AVG(rating) AS DOUBLE PRECISION) FROM "Ratings" WHERE "Ratings"."reviewId" = "Review"."id")`
                        ),
                        'avgRating',
                    ],
                ],
            },
            include: [
                {
                    model: Film,
                    as: 'film',
                    attributes: ['name'],
                    where: { name: { [Op.iLike]: `%${movie || ''}%` } },
                },
                {
                    model: User,
                    as: 'author',
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
            where,
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        })

        return { reviews: res.rows, count: res.count }
    },
    async getReview(
        id: number,
        uuId?: string,
        isPublishedOnly: boolean = true
    ) {
        let review

        const where = isPublishedOnly ? { id, isPublished: true } : { id }

        if (uuId) {
            review = await Review.findOne({
                attributes: {
                    include: [
                        [
                            Sequelize.literal(
                                `(SELECT CAST(AVG(rating) AS DOUBLE PRECISION) FROM "Ratings" WHERE "Ratings"."reviewId" = "Review"."id")`
                            ),
                            'avgRating',
                        ],
                    ],
                },
                include: [
                    { model: Film, as: 'film', attributes: ['name'] },
                    {
                        model: User,
                        as: 'author',
                        attributes: ['uuId', 'firstName', 'lastName'],
                    },
                    {
                        model: Rating,
                        as: 'ratings',
                        attributes: ['rating'],
                        where: Sequelize.and({ userUuId: uuId }),
                        required: false,
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        attributes: ['id', 'text'],
                        include: [
                            {
                                model: User,
                                as: 'author',
                                attributes: [
                                    'uuId',
                                    'email',
                                    'firstName',
                                    'isCommentsAllowed',
                                ],
                            },
                        ],
                    },
                ],
                where,
                order: [['comments', 'createdAt', 'DESC']],
            })
        } else {
            review = await Review.findOne({
                attributes: {
                    include: [
                        [
                            Sequelize.literal(
                                `(SELECT CAST(AVG(rating) AS DOUBLE PRECISION) FROM "Ratings" WHERE "Ratings"."reviewId" = "Review"."id")`
                            ),
                            'avgRating',
                        ],
                    ],
                },
                include: [
                    { model: Film, as: 'film', attributes: ['name'] },
                    {
                        model: User,
                        as: 'author',
                        attributes: ['uuId', 'firstName', 'lastName'],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        attributes: ['id', 'text'],
                        include: [
                            {
                                model: User,
                                as: 'author',
                                attributes: ['firstName'],
                            },
                        ],
                    },
                ],
                where,
                order: [['comments', 'createdAt', 'DESC']],
            })
        }

        if (!review) {
            throw ApiError.notFound('Review not found')
        }

        return review
    },
    async updateReview(
        id: number,
        review: Partial<IReview>,
        imageFileName?: string,
        userUuId?: string
    ) {
        const where =
            review.isUnpublishedByEditor === undefined
                ? { id, userUuId }
                : { id }

        const foundReview = await Review.findOne({
            attributes: ['image'],
            where,
        })

        if (!foundReview) {
            throw ApiError.notFound('Review not found')
        }

        if (review.isUnpublishedByEditor !== undefined) {
            await Review.update(
                {
                    ...review,
                    image: imageFileName,
                    isPublished: !review.isUnpublishedByEditor,
                },
                { where }
            )
        } else {
            await Review.update(
                {
                    ...review,
                    image: imageFileName,
                    isUnpublishedByEditor: false,
                },
                { where }
            )
        }

        if (imageFileName) {
            unlinkSync(
                resolve(__dirname, '../../static/images', foundReview.image)
            )
        }
    },
}
