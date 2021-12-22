import { DataTypes, Sequelize } from 'sequelize'
import { Film } from './classes/film'

export = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    Film.init(
        {
            imdbId: {
                type: dataTypes.STRING(10),
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            name: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: dataTypes.SMALLINT,
                allowNull: false,
            },
            country: {
                type: dataTypes.ARRAY(dataTypes.STRING(100)),
                allowNull: false,
            },
            genres: {
                type: dataTypes.ARRAY(dataTypes.STRING(20)),
                allowNull: false,
            },
            runtime: {
                type: dataTypes.SMALLINT,
                allowNull: false,
            },
            directors: {
                type: dataTypes.ARRAY(dataTypes.STRING(100)),
                allowNull: false,
            },
            actors: {
                type: dataTypes.ARRAY(dataTypes.STRING(100)),
                allowNull: false,
            },
            imdbRating: {
                type: dataTypes.DECIMAL(2, 1),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Film',
        },
    )

    return Film
};
