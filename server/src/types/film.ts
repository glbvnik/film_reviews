export interface IFilm {
    imdbId: string
    name: string
    year: number
    country: string[]
    genres: string[]
    runtime: number
    directors: string[]
    actors: string[]
    imdbRating: number
    createdAt: Date
    updatedAt: Date
}
