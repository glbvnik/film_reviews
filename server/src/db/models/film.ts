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
            },
            country: {
                type: dataTypes.ARRAY(dataTypes.STRING(100)),
            },
            genres: {
                type: dataTypes.ARRAY(dataTypes.STRING(20)),
            },
            runtime: {
                type: dataTypes.SMALLINT,
            },
            directors: {
                type: dataTypes.ARRAY(dataTypes.STRING(100)),
            },
            actors: {
                type: dataTypes.ARRAY(dataTypes.STRING(100)),
            },
            imdbRating: {
                type: dataTypes.DECIMAL(2, 1),
            },
        },
        {
            sequelize,
            modelName: 'Film',
        }
    )

    return Film
}
