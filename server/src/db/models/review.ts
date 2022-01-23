import { DataTypes, Sequelize } from 'sequelize'
import { Review } from './classes/review'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    Review.init(
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
            image: {
                type: dataTypes.STRING(42),
                unique: true,
                allowNull: false,
            },
            rating: {
                type: dataTypes.DECIMAL(1, 1),
                defaultValue: null,
            },
            isPublished: {
                type: dataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
            },
            isUnpublishedByEditor: {
                type: dataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            filmImdbId: {
                type: dataTypes.STRING(10),
                allowNull: false,
            },
            userUuId: {
                type: dataTypes.UUID,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Review',
        }
    )

    return Review
}
