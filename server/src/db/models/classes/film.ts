import { Model } from 'sequelize'
import { IFilm } from '../../../types/film'
import { Review } from './review'

type FilmAttributes = Omit<IFilm, 'createdAt' | 'updatedAt'>

export class Film extends Model<FilmAttributes> implements FilmAttributes {
    imdbId!: string
    name!: string
    year!: number | null
    country!: string[] | null
    genres!: string[] | null
    runtime!: number | null
    directors!: string[] | null
    actors!: string[] | null
    imdbRating!: number | null

    static associate() {
        Film.hasMany(Review, {
            as: 'reviews',
            foreignKey: { name: 'filmImdbId', allowNull: false },
        })
    }
}
