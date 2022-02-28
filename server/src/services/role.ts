import { Role } from '../db/models/classes/role'
import { User } from '../db/models/classes/user'
import { UserRole } from '../db/models/classes/userRole'
import { RolesEnum } from '../types/role'
import { IUserRole } from '../types/user'

export const RoleService = {
    async addUserRole(data: Omit<IUserRole, 'createdAt' | 'updatedAt'>) {
        await UserRole.create({ ...data })
    },
    async findUserRoles(userUuId: string) {
        const user = await User.findOne({
            include: [
                {
                    model: Role,
                    as: 'roles',
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            ],
            attributes: ['uuId'],
            where: { uuId: userUuId },
        })

        return user!.roles.map(({ name }) => name)
    },
    async removeUserRole(data: Omit<IUserRole, 'createdAt' | 'updatedAt'>) {
        await UserRole.destroy({ where: data })
    },
    async compareUserRoles(userUuId: string, roles: RolesEnum[]) {
        const userRoles = await this.findUserRoles(userUuId)

        return roles.some((role) => userRoles.includes(role))
    },
}
