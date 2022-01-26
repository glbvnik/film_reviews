export interface IReviewInputs {
    image: File | null
    text: string
    isPublished?: boolean
}

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
    Film: { name: string }
    User: {
        firstName: string
        lastName: string
    }
}

export interface IReviewsResponse {
    reviews: IReview[]
    count: number
}
