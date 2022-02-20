import { NextFunction, Request, Response } from 'express'
import { unlink } from 'fs'
import { ReviewService } from '../services/review'
import { TokenService } from '../services/token'
import { IReviewQuery } from '../types/review'

export const ReviewController = {
    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            await ReviewService.create(
                JSON.parse(req.body.review),
                JSON.parse(req.body.film),
                req.file!.filename,
                req.userUuId!
            )

            res.json({ message: 'Review was created' })
        } catch (e) {
            unlink(req.file!.path, (err) => console.log(err))

            next(e)
        }
    },
    async getReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await ReviewService.getReviews({
                ...req.query,
                isUnpublishedByEditor:
                    req.query.isUnpublishedByEditor === 'true' ||
                    req.query.isUnpublishedByEditor === 'false'
                        ? JSON.parse(req.query.isUnpublishedByEditor)
                        : undefined,
            } as unknown as IReviewQuery)

            res.json(response)
        } catch (e) {
            next(e)
        }
    },
    async getReview(req: Request, res: Response, next: NextFunction) {
        try {
            const uuId = TokenService.getUuId(req.cookies.refreshToken)

            const review = await ReviewService.getReview(
                +req.params.id,
                uuId,
                !!req.params.isPublished
            )

            res.json({ review })
        } catch (e) {
            next(e)
        }
    },
    async updateReview(req: Request, res: Response, next: NextFunction) {
        try {
            await ReviewService.updateReview(
                +req.params.id,
                JSON.parse(req.body.review),
                req.file?.filename,
                req.userUuId
            )

            res.json({ message: 'Review was updated' })
        } catch (e) {
            next(e)
        }
    },
}
