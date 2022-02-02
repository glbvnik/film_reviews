import { DataTypes, Sequelize } from 'sequelize'
import { Rating } from './classes/rating'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    Rating.init(
        {
            reviewId: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Reviews',
                    key: 'id',
                },
            },
            userUuId: {
                type: dataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'uuId',
                },
            },
            rating: {
                type: dataTypes.SMALLINT,
                defaultValue: null,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Rating',
        }
    )

    return Rating
}
