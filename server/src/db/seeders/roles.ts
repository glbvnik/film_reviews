import { QueryInterface } from 'sequelize'
import { IRole, RolesEnum } from '../../types/role'

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert('Roles', [
            {
                name: RolesEnum.ADMIN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: RolesEnum.EDITOR,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: RolesEnum.MODERATOR,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: RolesEnum.USER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: RolesEnum.WRITER,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ] as IRole[])
    },
}
