export interface IComment {
    id: number
    text: string
    author: {
        uuId?: string
        email?: string
        firstName: string
        isCommentsAllowed?: boolean
    }
}

export interface ICommentInputs {
    text: string
    reviewId: number
}
