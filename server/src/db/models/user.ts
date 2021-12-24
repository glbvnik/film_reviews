import { DataTypes, Sequelize, UUIDV4 } from 'sequelize'
import { UserRoles } from '../../types/user'
import { User } from './classes/user'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    User.init(
        {
            id: {
                type: dataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            email: {
                type: dataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: dataTypes.STRING(50),
                allowNull: false,
            },
            lastName: {
                type: dataTypes.STRING(50),
                allowNull: false,
            },
            role: {
                type: dataTypes.ARRAY(
                    dataTypes.ENUM(...Object.values(UserRoles))
                ),
            },
            isActivated: {
                type: dataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            activationLink: {
                type: dataTypes.UUID,
                defaultValue: UUIDV4,
                unique: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    )

    return User
}
