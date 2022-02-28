import { Router } from 'express'
import { CommentController } from '../controllers/comment'
import { RatingController } from '../controllers/rating'
import { ReviewController } from '../controllers/review'
import { authMiddleware } from '../middlewares/auth'
import { upload } from '../middlewares/multer'
import { RolesEnum } from '../types/role'

export const reviewRouter = Router()

reviewRouter.post(
    '',
    authMiddleware([RolesEnum.WRITER]),
    upload.single('image'),
    ReviewController.create
)
reviewRouter.get('', ReviewController.get)
reviewRouter.get('/:id', ReviewController.getOne)
reviewRouter.patch(
    '/:id',
    authMiddleware([RolesEnum.EDITOR, RolesEnum.WRITER]),
    upload.single('image'),
    ReviewController.update
)
reviewRouter.delete(
    '/:id/user/:userUuId',
    authMiddleware([RolesEnum.WRITER]),
    ReviewController.delete
)

//comments
reviewRouter.post(
    '/:reviewId/user/:userUuId/comments',
    authMiddleware([RolesEnum.USER], true),
    CommentController.create
)
reviewRouter.delete(
    '/user/:userUuId/comments/:commentId',
    authMiddleware([RolesEnum.USER]),
    CommentController.delete
)

//ratings
reviewRouter.post(
    '/:reviewId/user/:userUuId/ratings',
    authMiddleware([RolesEnum.USER]),
    RatingController.create
)
reviewRouter.put(
    '/:reviewId/user/:userUuId/ratings',
    authMiddleware([RolesEnum.USER]),
    RatingController.update
)
reviewRouter.delete(
    '/:reviewId/user/:userUuId/ratings',
    authMiddleware([RolesEnum.USER]),
    RatingController.delete
)
