import { DataTypes, Sequelize } from 'sequelize'
import { UserRole } from './classes/userRole'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    UserRole.init(
        {
            userUuId: {
                type: dataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'uuId',
                },
            },
            roleId: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Roles',
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            modelName: 'UserRole',
        }
    )

    return UserRole
}
