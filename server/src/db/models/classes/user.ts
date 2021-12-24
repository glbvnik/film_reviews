import { Model } from 'sequelize'
import { IUser, UserRoles } from '../../../types/user'
import { Review } from './review'
import { Token } from './token'

type UserAttributes = Omit<IUser, 'createdAt' | 'updatedAt'>

export class User extends Model<UserAttributes> implements UserAttributes {
    id!: string
    email!: string
    password!: string
    firstName!: string
    lastName!: string
    isActivated!: boolean
    activationLink!: string
    role!: UserRoles[]

    static associate() {
        User.hasMany(Token, {
            foreignKey: { name: 'userId' },
        })
        User.hasMany(Review, {
            foreignKey: { name: 'userId' },
        })
    }
}
