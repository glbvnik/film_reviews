import { Model } from 'sequelize'
import { IUserRole } from '../../../types/user'

type UserRoleAttributes = Omit<IUserRole, 'createdAt' | 'updatedAt'>

export class UserRole
    extends Model<UserRoleAttributes>
    implements UserRoleAttributes
{
    userUuId!: string
    roleId!: number
}
