import { Model } from 'sequelize'
import { IFilm } from './../../../types/film'
import { Review } from './review'

type FilmAttributes = Omit<IFilm, 'createdAt' | 'updatedAt'>;

export class Film extends Model<FilmAttributes> implements FilmAttributes {
    imdbId!: string
    name!: string
    year!: number
    country!: string[]
    genres!: string[]
    runtime!: number
    directors!: string[]
    actors!: string[]
    imdbRating!: number

    static associate() {
        Film.hasMany(Review, {
            foreignKey: { name: 'filmId', allowNull: false },
        })
    }
}
