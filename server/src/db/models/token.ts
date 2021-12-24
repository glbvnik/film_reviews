import { DataTypes, Sequelize } from 'sequelize'
import { Token } from './classes/token'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    Token.init(
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
            },
            agent: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            refreshToken: {
                type: dataTypes.TEXT,
                unique: true,
                allowNull: false,
            },
            userId: {
                type: dataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Token',
        }
    )

    return Token
}
