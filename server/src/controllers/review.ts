import { NextFunction, Request, Response } from 'express'
import { unlink } from 'fs'
import { ReviewService } from '../services/review'
import { TokenService } from '../services/token'
import { IReviewQuery } from '../types/review'

export const ReviewController = {
    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            await ReviewService.create(
                req.body,
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
            const response = await ReviewService.getReviews(
                req.query as unknown as IReviewQuery
            )

            res.json(response)
        } catch (e) {
            next(e)
        }
    },
    async getReview(req: Request, res: Response, next: NextFunction) {
        try {
            const uuId = TokenService.getUuId(req.cookies.refreshToken)

            const review = await ReviewService.getReview(req.params.id, uuId)

            res.json({ review })
        } catch (e) {
            next(e)
        }
    },
}
