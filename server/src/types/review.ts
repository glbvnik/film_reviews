export interface IReview {
    id: number
    text: string
    image: string
    isPublished: boolean
    isUnpublishedByEditor: boolean
    filmImdbId: string
    userUuId: string
    createdAt: Date
    updatedAt: Date
}

export interface IReviewCreateInputs {
    text: string
    isPublished: boolean
}

export interface IReviewQuery {
    movie?: string
    author?: string
    limit: number
    offset: number
    isCount?: boolean
    userUuId?: string
    isUnpublishedByEditor?: boolean
}
