import { NextFunction, Request, Response } from 'express'
import { RatingService } from '../services/rating'
import { TokenService } from '../services/token'

export const RatingController = {
    async createRating(req: Request, res: Response, next: NextFunction) {
        try {
            const userUuId = TokenService.getUuId(req.cookies.refreshToken)

            await RatingService.create({ ...req.body, userUuId })

            res.json({ message: 'Rating was created' })
        } catch (e) {
            next(e)
        }
    },
    async updateRating(req: Request, res: Response, next: NextFunction) {
        try {
            const userUuId = TokenService.getUuId(req.cookies.refreshToken)

            await RatingService.update({ ...req.body, userUuId })

            res.json({ message: 'Rating was updated' })
        } catch (e) {
            next(e)
        }
    },
    async deleteRating(req: Request, res: Response, next: NextFunction) {
        try {
            const userUuId = TokenService.getUuId(req.cookies.refreshToken)

            await RatingService.delete({
                reviewId: +req.params.reviewId,
                userUuId,
            })

            res.json({ message: 'Rating was deleted' })
        } catch (e) {
            next(e)
        }
    },
}
