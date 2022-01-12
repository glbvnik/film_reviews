import { DataTypes, Sequelize } from 'sequelize'
import { User } from './classes/user'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    User.init(
        {
            uuId: {
                type: dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4,
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
            isActivated: {
                type: dataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            activationLink: {
                type: dataTypes.UUID,
                unique: true,
                allowNull: false,
            },
            passwordResetLink: {
                type: dataTypes.UUID,
                unique: true,
            },
            isCommentsAllowed: {
                type: dataTypes.BOOLEAN,
                defaultValue: true,
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
