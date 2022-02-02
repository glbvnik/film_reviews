import { Model } from 'sequelize'
import { IRating } from '../../../types/rating'
import { Review } from './review'
import { User } from './user'

type RatingAttributes = Omit<IRating, 'createdAt' | 'updatedAt'>

export class Rating
    extends Model<RatingAttributes>
    implements RatingAttributes
{
    reviewId!: number
    userUuId!: string
    rating!: number

    static associate() {
        Rating.belongsTo(Review, {
            as: 'review',
            foreignKey: { name: 'reviewId', allowNull: false },
        })
        Rating.belongsTo(User, {
            as: 'evaluator',
            foreignKey: { name: 'userUuId', allowNull: false },
        })
    }
}
