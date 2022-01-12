import { Model, Optional } from 'sequelize'
import { IReview } from '../../../types/review'
import { Comment } from './comment'
import { Film } from './film'
import { User } from './user'

type ReviewAttributes = Omit<IReview, 'createdAt' | 'updatedAt'>

interface ReviewCreationAttributes
    extends Optional<ReviewAttributes, 'id' | 'rating' | 'isPublished'> {}

export class Review
    extends Model<ReviewAttributes, ReviewCreationAttributes>
    implements ReviewAttributes
{
    id!: number
    text!: string
    image!: string
    rating!: number | null
    isPublished!: boolean
    filmImdbId!: string
    userUuId!: string

    static associate() {
        Review.belongsTo(Film, {
            foreignKey: { name: 'filmImdbId', allowNull: false },
        })
        Review.belongsTo(User, {
            foreignKey: { name: 'userUuId', allowNull: false },
        })
        Review.hasMany(Comment, {
            foreignKey: { name: 'reviewId' },
        })
    }
}
