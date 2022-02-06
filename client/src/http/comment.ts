import { ICommentInputs } from '../models/comment'
import $api from './index'

export const CommentAPI = {
    async create(inputs: ICommentInputs) {
        await $api.post('comment-management/create', inputs)
    },
    async delete(id: number) {
        await $api.delete(`comment-management/delete/${id}`)
    },
}
