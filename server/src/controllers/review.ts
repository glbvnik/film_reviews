import { NextFunction, Request, Response } from 'express'
import { unlink } from 'fs'
import { ReviewService } from '../services/review'

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
            const response = await ReviewService.getReviews()

            res.json(response)
        } catch (e) {
            next(e)
        }
    },
}
