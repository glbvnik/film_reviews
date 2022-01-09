import { Model } from 'sequelize'
import { IUser } from '../../../types/user'
import { Review } from './review'
import { Role } from './role'
import { Token } from './token'
import { UserRole } from './userRole'

type UserAttributes = Omit<IUser, 'createdAt' | 'updatedAt'>

export class User extends Model<UserAttributes> implements UserAttributes {
    uuId!: string
    email!: string
    password!: string
    firstName!: string
    lastName!: string
    isActivated!: boolean
    activationLink!: string

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
    }
}
