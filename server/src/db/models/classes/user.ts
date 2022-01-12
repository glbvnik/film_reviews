import { Model, Optional } from 'sequelize'
import { IUser } from '../../../types/user'
import { Comment } from './comment'
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

    static associate() {
        User.belongsToMany(Role, {
            through: UserRole,
        })
        User.hasMany(Token, {
            foreignKey: { name: 'userUuId' },
        })
        User.hasMany(Review, {
            foreignKey: { name: 'userUuId' },
        })
        User.hasMany(Comment, {
            foreignKey: { name: 'userUuId' },
        })
    }
}
