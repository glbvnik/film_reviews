import { ICommentInputs } from '../models/comment'
import $api from './index'

export const CommentAPI = {
    async create({ text, reviewId }: ICommentInputs, userUuId: string) {
        await $api.post(`reviews/${reviewId}/user/${userUuId}/comments`, {
            text,
        })
    },
    async delete(id: number, userUuId: string) {
        await $api.delete(`reviews/user/${userUuId}/comments/${id}`)
    },
}
