import { NextFunction, Request, Response } from 'express'
import { CommentService } from '../services/comment'
import { TokenService } from '../services/token'

export const CommentController = {
    async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userUuId = TokenService.getUuId(req.cookies.refreshToken)

            await CommentService.create({ ...req.body, userUuId })

            res.json({ message: 'Comment was created' })
        } catch (e) {
            next(e)
        }
    },
    async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userUuId = TokenService.getUuId(req.cookies.refreshToken)

            await CommentService.delete({ id: +req.params.commentId, userUuId })

            res.json({ message: 'Comment was deleted' })
        } catch (e) {
            next(e)
        }
    },
}
