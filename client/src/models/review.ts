import { IComment } from './comment'

export interface IReviewInputs {
    image: File | null
    text: string
    isPublished: boolean
}

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
    avgRating: number | null
    ratings?: [{ rating: number }] | []
    film: { name: string }
    author: {
        uuId: string
        firstName: string
        lastName: string
    }
    comments: IComment[]
}

export interface IReviewsResponse {
    reviews: IReview[]
    count: number
}

export interface IReviewQuery {
    movie?: string
    author?: string
    limit?: number
    offset?: number
    isCount?: boolean
    userUuId?: string
    isUnpublishedByEditor?: boolean
}

export enum ReviewActionsEnum {
    CREATE_REVIEW = 'CREATE_REVIEW',
    UPDATE_REVIEW = 'UPDATE_REVIEW',
    DELETE_REVIEW = 'DELETE_REVIEW',
}
