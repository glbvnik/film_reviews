import { Comment } from '../db/models/classes/comment'
import ApiError from '../errors/api'
import { IComment } from '../types/comment'
import { RolesEnum } from '../types/role'
import { RoleService } from './role'

export const CommentService = {
    async create(comment: Omit<IComment, 'id' | 'createdAt' | 'updatedAt'>) {
        await Comment.create(comment)
    },
    async delete(data: { id: number; userUuId: string }) {
        const roles = await RoleService.findUserRoles(data.userUuId)

        if (roles.includes(RolesEnum.MODERATOR)) {
            await Comment.destroy({
                where: { id: data.id },
            })
        }

        const count = await Comment.destroy({
            where: { id: data.id, userUuId: data.userUuId },
        })

        if (!count) {
            throw ApiError.notFound('Comment not found')
        }
    },
}
