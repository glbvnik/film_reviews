import { Model, Optional } from 'sequelize'
import { IRole } from '../../../types/role'
import { IUser } from '../../../types/user'
import { Comment } from './comment'
import { Rating } from './rating'
import { Review } from './review'
import { Role } from './role'
import { Token } from './token'
import { UserRole } from './userRole'

type UserAttributes = Omit<IUser, 'createdAt' | 'updatedAt'>

interface UserCreationAttributes
    extends Optional<
        UserAttributes,
        | 'uuId'
        | 'isActivated'
        | 'activationLink'
        | 'passwordResetLink'
        | 'isCommentsAllowed'
    > {}

export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
{
    uuId!: string
    email!: string
    password!: string
    firstName!: string
    lastName!: string
    isActivated!: boolean
    activationLink!: string
    passwordResetLink!: string | null
    isCommentsAllowed!: boolean
    roles!: IRole[]

    static associate() {
        User.belongsToMany(Role, {
            through: UserRole,
            as: 'roles',
            foreignKey: 'userUuId',
        })
        User.hasMany(Token, {
            as: 'tokens',
            foreignKey: { name: 'userUuId' },
        })
        User.hasMany(Review, {
            as: 'reviews',
            foreignKey: { name: 'userUuId' },
        })
        User.hasMany(Comment, {
            as: 'comments',
            foreignKey: { name: 'userUuId' },
        })
        User.hasMany(Rating, {
            as: 'ratings',
            foreignKey: { name: 'userUuId' },
        })
    }
}
