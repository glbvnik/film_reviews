import { NextFunction, Request, Response } from 'express'
import { CommentService } from '../services/comment'

export const CommentController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await CommentService.create({
                ...req.body,
                reviewId: +req.params.reviewId,
                userUuId: req.params.userUuId,
            })

            res.json({ message: 'Comment was created' })
        } catch (e) {
            next(e)
        }
    },
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await CommentService.delete({
                id: +req.params.commentId,
                userUuId: req.params.userUuId,
            })

            res.json({ message: 'Comment was deleted' })
        } catch (e) {
            next(e)
        }
    },
}
