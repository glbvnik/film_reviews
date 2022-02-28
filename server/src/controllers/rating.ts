import { NextFunction, Request, Response } from 'express'
import { RatingService } from '../services/rating'

export const RatingController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await RatingService.create({
                ...req.body,
                reviewId: +req.params.reviewId,
                userUuId: req.params.userUuId,
            })

            res.json({ message: 'Rating was created' })
        } catch (e) {
            next(e)
        }
    },
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            await RatingService.update({
                ...req.body,
                reviewId: +req.params.reviewId,
                userUuId: req.params.userUuId,
            })

            res.json({ message: 'Rating was updated' })
        } catch (e) {
            next(e)
        }
    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await RatingService.delete({
                reviewId: +req.params.reviewId,
                userUuId: req.params.userUuId,
            })

            res.json({ message: 'Rating was deleted' })
        } catch (e) {
            next(e)
        }
    },
}
