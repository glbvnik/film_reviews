import { DataTypes, Sequelize } from 'sequelize'
import { UserRole } from './classes/userRole'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    UserRole.init(
        {
            UserUuId: {
                type: dataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'uuId',
                },
            },
            RoleId: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Role',
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
