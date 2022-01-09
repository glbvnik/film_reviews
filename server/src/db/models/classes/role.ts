import { Model } from 'sequelize'
import { IRole, RolesEnum } from '../../../types/role'
import { User } from './user'
import { UserRole } from './userRole'

type RoleAttributes = Omit<IRole, 'createdAt' | 'updatedAt'>

export class Role extends Model<RoleAttributes> implements RoleAttributes {
    id!: number
    name!: RolesEnum

    static associate() {
        Role.belongsToMany(User, {
            through: UserRole,
        })
    }
}
