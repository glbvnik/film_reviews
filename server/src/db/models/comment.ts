import { DataTypes, Sequelize } from 'sequelize'
import { Comment } from './classes/comment'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    Comment.init(
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true,
                allowNull: false,
            },
            text: {
                type: dataTypes.TEXT,
                allowNull: false,
            },
            reviewId: {
                type: dataTypes.INTEGER,
                allowNull: false,
            },
            userUuId: {
                type: dataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    )

    return Comment
}
