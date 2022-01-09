export interface IReview {
    id: number
    text: string
    image: string
    rating?: number
    filmId: string
    userUuId: string
    createdAt: Date
    updatedAt: Date
}
