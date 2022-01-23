export interface IReview {
    id: number
    text: string
    image: string
    rating: number | null
    isPublished: boolean
    isUnpublishedByEditor: boolean
    filmImdbId: string
    userUuId: string
    createdAt: Date
    updatedAt: Date
}

export interface IReviewInputs {
    text: string
    isPublished?: boolean
}
