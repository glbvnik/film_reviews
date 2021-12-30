import { Router } from 'express'
import { ReviewController } from '../controllers/review'
import { authMiddleware } from '../middlewares/auth'
import { upload } from '../middlewares/multer'
import { UserRoles } from '../types/user'

export const reviewRouter = Router()

reviewRouter.post(
    '/create',
    authMiddleware([UserRoles.ADMIN, UserRoles.WRITER]),
    upload.single('image'),
    ReviewController.createReview
)
