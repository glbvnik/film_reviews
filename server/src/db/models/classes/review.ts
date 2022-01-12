import { Model, Optional } from 'sequelize'
import { IReview } from '../../../types/review'
import { Film } from './film'
import { User } from './user'

type ReviewAttributes = Omit<IReview, 'createdAt' | 'updatedAt'>

interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

export class Review
    extends Model<ReviewAttributes, ReviewCreationAttributes>
    implements ReviewAttributes
{
    id!: number
    text!: string
    image!: string
    rating!: number
    filmImdbId!: string
    userUuId!: string

    static associate() {
        Review.belongsTo(Film, {
            foreignKey: { name: 'filmImdbId', allowNull: false },
        })
        Review.belongsTo(User, {
            foreignKey: { name: 'userUuId', allowNull: false },
        })
    }
}
