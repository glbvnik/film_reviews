export interface IReview {
    id: number
    text: string
    image: string
    rating?: number
    filmImdbId: string
    userUuId: string
    createdAt: Date
    updatedAt: Date
}
