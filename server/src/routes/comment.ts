import { Router } from 'express'
import { CommentController } from '../controllers/comment'
import { authMiddleware } from '../middlewares/auth'
import { RolesEnum } from '../types/role'

export const commentRouter = Router()

commentRouter.post(
    '/create',
    authMiddleware([RolesEnum.USER], true),
    CommentController.createComment
)
commentRouter.delete(
    '/delete/:commentId',
    authMiddleware([RolesEnum.USER]),
    CommentController.deleteComment
)
