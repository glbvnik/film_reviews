import { Router } from 'express'
import { ReviewController } from '../controllers/review'
import { authMiddleware } from '../middlewares/auth'
import { upload } from '../middlewares/multer'
import { RolesEnum } from '../types/role'

export const reviewRouter = Router()

reviewRouter.post(
    '/create',
    authMiddleware([RolesEnum.WRITER]),
    upload.single('image'),
    ReviewController.createReview
)
reviewRouter.get('/reviews', ReviewController.getReviews)
reviewRouter.get('/reviews/:id', ReviewController.getReview)
