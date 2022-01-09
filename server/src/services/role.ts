import { Role } from '../db/models/classes/role'
import { User } from '../db/models/classes/user'
import { IRole, RolesEnum } from '../types/role'

export const RoleService = {
    async findUserRoles(userUuId: string) {
        const user = (await User.findOne({
            include: [
                {
                    model: Role,
                    through: { where: { UserUuId: userUuId } },
                    attributes: ['name'],
                },
            ],
        })) as User & { Roles: IRole[] }

        return user.Roles.map(({ name }) => name)
    },
    async compareUserRoles(userUuId: string, roles: RolesEnum[]) {
        const userRoles = await this.findUserRoles(userUuId)

        return roles.every((role) => userRoles.includes(role))
    },
}
