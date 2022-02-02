import { Router } from 'express'
import { RatingController } from '../controllers/rating'
import { authMiddleware } from '../middlewares/auth'
import { RolesEnum } from '../types/role'

export const ratingRouter = Router()

ratingRouter.post(
    '/create',
    authMiddleware([RolesEnum.USER]),
    RatingController.createRating
)
ratingRouter.put(
    '/update',
    authMiddleware([RolesEnum.USER]),
    RatingController.updateRating
)
ratingRouter.delete(
    '/delete/:reviewId',
    authMiddleware([RolesEnum.USER]),
    RatingController.deleteRating
)
