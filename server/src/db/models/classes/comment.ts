import { Model, Optional } from 'sequelize'
import { IComment } from '../../../types/comment'
import { Review } from './review'
import { User } from './user'

type CommentAttributes = Omit<IComment, 'createdAt' | 'updatedAt'>

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

export class Comment
    extends Model<CommentAttributes, CommentCreationAttributes>
    implements CommentAttributes
{
    id!: number
    text!: string
    reviewId!: number
    userUuId!: string

    static associate() {
        Comment.belongsTo(Review, {
            as: 'review',
            foreignKey: { name: 'reviewId', allowNull: false },
        })
        Comment.belongsTo(User, {
            as: 'author',
            foreignKey: { name: 'userUuId', allowNull: false },
        })
    }
}
