export interface IReview {
    id: number
    text: string
    image: string
    rating?: number
    filmId: string
    userId: string
    createdAt: Date
    updatedAt: Date
}
