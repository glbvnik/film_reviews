export interface IFilm {
    imdbId: string
    name: string
    year: number | null
    country: string[] | null
    genres: string[] | null
    runtime: number | null
    directors: string[] | null
    actors: string[] | null
    imdbRating: number | null
    createdAt: Date
    updatedAt: Date
}
