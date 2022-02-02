import { Model, Optional } from 'sequelize'
import { IReview } from '../../../types/review'
import { Comment } from './comment'
import { Film } from './film'
import { Rating } from './rating'
import { User } from './user'

type ReviewAttributes = Omit<IReview, 'createdAt' | 'updatedAt'>

interface ReviewCreationAttributes
    extends Optional<
        ReviewAttributes,
        'id' | 'isPublished' | 'isUnpublishedByEditor'
    > {}

export class Review
    extends Model<ReviewAttributes, ReviewCreationAttributes>
    implements ReviewAttributes
{
    id!: number
    text!: string
    image!: string
    isPublished!: boolean
    isUnpublishedByEditor!: boolean
    filmImdbId!: string
    userUuId!: string

    static associate() {
        Review.belongsTo(Film, {
            as: 'film',
            foreignKey: { name: 'filmImdbId', allowNull: false },
        })
        Review.belongsTo(User, {
            as: 'author',
            foreignKey: { name: 'userUuId', allowNull: false },
        })
        Review.hasMany(Comment, {
            as: 'comments',
            foreignKey: { name: 'reviewId' },
        })
        Review.hasMany(Rating, {
            as: 'ratings',
            foreignKey: { name: 'reviewId' },
        })
    }
}
