import { DataTypes, Sequelize } from 'sequelize'
import { RolesEnum } from '../../types/role'
import { Role } from './classes/role'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    Role.init(
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
            },
            name: {
                type: dataTypes.ENUM(...Object.values(RolesEnum)),
                unique: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Role',
        }
    )

    return Role
}
